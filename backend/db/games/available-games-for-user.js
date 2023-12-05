const database = require("../connection");
const { connection: db } = database;

// get all game ids
// omit game ids I am in

// TODO: Fix this SQL
const AVAILABLE_GAMES = `
  SELECT * FROM game_users
  WHERE game_users.user_id != $1
`;

const availableGamesForUser = (userId) => db.any(AVAILABLE_GAMES, [userId]);

module.exports = { availableGamesForUser };
