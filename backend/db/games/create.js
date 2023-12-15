const database = require("../connection");
const { connection: db } = database;

const CREATE = `
  INSERT INTO games (max_players, status, initialized) 
  VALUES ($1, $2, $3) RETURNING id
`;

const MAX_GAMES = 5;

const create = async (max_players) => {
  try {
    // check the current number of active games
    const activeGamesCount = await db.one(
      "SELECT COUNT(*) FROM games WHERE status != 'finished'",
    );

    if (parseInt(activeGamesCount.count, 100) >= MAX_GAMES) {
      // Logic to handle when maximum games are reached
      return { error: "Maximum number of games reached." };
    }

    // Create a new game if under the limit
    return await db.one(CREATE, [max_players, "waiting", false]);
  } catch (err) {
    console.error(err);
    throw err; // Rethrow the error for the caller to handle
  }
};

module.exports = { create };
