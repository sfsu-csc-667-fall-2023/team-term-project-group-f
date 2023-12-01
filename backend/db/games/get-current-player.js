const database = require("../connection");
const { connection: db } = database;

const GET_CURRENT_PLAYER = `
  SELECT current_seat FROM games
  WHERE id=$1
`;

const getCurrentPlayer = (gameId) => db.one(GET_CURRENT_PLAYER, [gameId]);

module.exports = { getCurrentPlayer };
