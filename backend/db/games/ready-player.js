const database = require("../connection");
const { connection: db } = database;

const READY_PLAYER = `
  UPDATE game_users SET ready=true
  WHERE user_id=$1 AND game_id=$2
`;

const READY_COUNT = `
  SELECT
    (SELECT COUNT(*) FROM game_users WHERE game_id=$1) AS player_count,
    (SELECT COUNT(*) FROM game_users WHERE game_id=$1 AND ready=true) as ready_count
`;

const readyPlayer = (userId, gameId) =>
  db
    .none(READY_PLAYER, [userId, gameId])
    .then((_) => db.one(READY_COUNT, [gameId]))
    .then(({ player_count, ready_count }) => ({
      player_count: parseInt(player_count),
      ready_count: parseInt(ready_count),
    }));

module.exports = { readyPlayer };
