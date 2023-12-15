const database = require("../connection");
const { connection: db } = database;

const SET_LAST_PLAYED_CARD = `
    UPDATE games
    SET lastPlayed = $1
    WHERE id = $2;
`; // order by card to play last card

const setLastCard = (gameId, cardId) =>
  db.oneOrNone(SET_LAST_PLAYED_CARD, [gameId]);

module.exports = { setLastCard };
