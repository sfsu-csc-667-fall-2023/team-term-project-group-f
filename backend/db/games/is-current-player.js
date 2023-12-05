const database = require("../connection");
const { connection: db } = database;

const IS_CURRENT_PLAYER = `
  SELECT current_seat FROM games
  WHERE id=$1
`;

const isCurrentPlayer = (gameId, userId) =>
  db
    .one(IS_CURRENT_PLAYER, [gameId])
    .then(({ current_seat: playerId }) => playerId === userId);

module.exports = { isCurrentPlayer };
