const database = require("../connection");
const { connection: db } = database;

const GET_LAST_PLAYED_CARD = `
  SELECT GC.*
  FROM Games G
  JOIN Cards GC ON G.lastPlayed = GC.id
  WHERE G.id = $1
  LIMIT 1;
`; // order by card to play last card

const getLastCard = (gameId) => db.oneOrNone(GET_LAST_PLAYED_CARD, [gameId]);

module.exports = { getLastCard };
