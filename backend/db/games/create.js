const database = require("../connection");
const { connection: db } = database;

const CREATE = `
  INSERT INTO games (max_players, status, initialized) 
  VALUES ($1, $2, $3) RETURNING id
`;

const create = (max_players) =>
  db
    .one(CREATE, [max_players, "waiting", false])
    .catch((err) => console.log(err));

module.exports = { create };
