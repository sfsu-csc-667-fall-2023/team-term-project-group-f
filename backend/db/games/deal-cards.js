const database = require("../connection");
const { connection: db, pgp } = database;

const dealCards = (users, cards, gameId) => {
  console.log({ users, cards, gameId });

  // Array of { card_id, user_id, game_id }
  const dealtCards = cards.map(({ card_id }, index) => ({
    card_id,
    game_id: gameId,
    user_id: users[index % users.length].user_id,
    user_sid: users[index % users.length].sid,
  }));

  const columns = new pgp.helpers.ColumnSet([
    "?game_id",
    "?card_id",
    "user_id",
  ]);
  const query =
    pgp.helpers.update(dealtCards, columns, "game_cards") +
    "WHERE v.card_id=t.card_id AND v.game_id=t.game_id";

  return db.none(query).then((_) => dealtCards);
};

module.exports = { dealCards };
