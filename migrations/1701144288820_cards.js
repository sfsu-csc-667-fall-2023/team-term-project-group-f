/* eslint-disable camelcase */

exports.shorthands = undefined;

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = (pgm) => {
  pgm.createTable("cards", {
    id: "id",
    suit: {
      type: "int",
    },
    value: {
      type: "int",
    },
  });

  const sql = "INSERT INTO cards (suit, value) VALUES";
  const values = [];

  for (let suit = 0; suit < 4; suit++) {
    for (let value = 1; value <= 13; value++) {
      values.push(`(${suit}, ${value})`);
    }
  }

  const query = `${sql} ${values.join(",")}`;

  pgm.sql(query);
};

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.down = (pgm) => {
  pgm.dropTable("cards");
};
