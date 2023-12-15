const database = require("../connection");
const { connection: db } = database;

const GET_LAST_PLAYED_CARD = `
  SELECT cards.* FROM game_cards
  JOIN cards ON game_cards.card_id = cards.id
  WHERE game_cards.game_id = $1 AND game_cards.user_id != 0
  ORDER BY game_cards.card_order DESC
  LIMIT 1
`; // order by card to play last card

const getLastCard = (gameId) => db.oneOrNone(GET_LAST_PLAYED_CARD, [gameId]);

module.exports = { getLastCard };
