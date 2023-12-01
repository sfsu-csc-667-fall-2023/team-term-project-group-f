const database = require("../connection");
const { connection: db } = database;

const USERS_IN_GAME = `
  SELECT * FROM game_users, users
  WHERE game_users.game_id = $1 AND
    game_users.user_id = users.id
`;

const usersInGame = (gameId) => db.any(USERS_IN_GAME, [gameId]);

module.exports = { usersInGame };
