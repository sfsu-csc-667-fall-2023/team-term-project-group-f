const database = require("../connection");
const { connection: db } = database;

const AVAILABLE_GAMES = `
  SELECT games.*
  FROM games
  LEFT JOIN game_users ON games.id = game_users.game_id
  WHERE games.id NOT IN (
    SELECT game_id FROM game_users WHERE user_id = $1
  )
  AND games.status = 'waiting'
  GROUP BY games.id
  HAVING COUNT(game_users.user_id) < games.max_players
`;

const availableGamesForUser = (userId) => db.any(AVAILABLE_GAMES, [userId]);

module.exports = { availableGamesForUser };
