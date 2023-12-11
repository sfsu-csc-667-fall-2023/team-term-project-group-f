const database = require("../connection");
const { connection: db } = database;
const { userCount } = require("./user-count");

const ADD_USER = `
  INSERT INTO game_users (user_id, game_id, seat)
  VALUES ($1, $2, $3) RETURNING game_id
`;

const addUser = (userId, gameId) =>
  userCount(gameId).then((playerCount) =>
    db.one(ADD_USER, [userId, gameId, playerCount]),
  );

module.exports = { addUser };
