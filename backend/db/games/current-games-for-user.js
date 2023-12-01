const database = require("../connection");
const { connection: db } = database;

const CURRENT_GAMES = `
  SELECT * FROM game_users
  WHERE game_users.user_id = $1
`;

const currentGamesForUser = (userId) => db.any(CURRENT_GAMES, [userId]);

module.exports = { currentGamesForUser };
