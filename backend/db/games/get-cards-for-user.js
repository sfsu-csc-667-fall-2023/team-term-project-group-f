const database = require("../connection");
const { connection: db } = database;

const GET_CARDS_FOR_USER = `
  SELECT * FROM game_cards, cards
  WHERE game_cards.game_id=$1
    AND game_cards.user_id=$2
    AND cards.id=game_cards.card_id
`;

const getCardsForUser = (gameId, userId) =>
  db.any(GET_CARDS_FOR_USER, [gameId, userId]);

module.exports = { getCardsForUser };
