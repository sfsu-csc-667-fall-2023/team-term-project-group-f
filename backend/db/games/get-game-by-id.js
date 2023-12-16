const database = require("../connection");
const { connection: db } = database;

const GET_GAME_BY_ID = `
  SELECT * FROM games
  WHERE id=$1
`;

const getGameById = (gameId) => db.one(GET_GAME_BY_ID, [gameId]);

module.exports = { getGameById };
