// const database = require("../connection");
// const { connection: db } = database;

// const DRAW_CARDS = `
//   SELECT * FROM game_cards, cards
//   WHERE game_cards.game_id=$1 AND game_cards.user_id=0 AND game_cards.card_id=cards.id
//   ORDER BY game_cards.card_order LIMIT $2
// `;

// const drawCards = (gameId, cardCount) =>
//   db.many(DRAW_CARDS, [gameId, cardCount]);

// module.exports = { drawCards };

const database = require("../connection");
const { connection: db } = database;

// drawing a specified number of cards from the deck
const drawCards = async (gameId, cardCount) => {
  // Select the top card from deck
  const cardsToDraw = await db.manyOrNone(
    `
    SELECT * FROM game_cards
    WHERE game_id = $1 AND user_id = 0
    ORDER BY card_order
    LIMIT $2
  `,
    [gameId, cardCount],
  );

  //update user_id of the drawn card to player's id
  // if (cardsToDraw.length > 0) {
  //   const updateQueries = cardsToDraw.map((card) => {
  //     return db.none(
  //       `
  //       UPDATE game_cards
  //       SET user_id = $1
  //       WHERE card_id = $2
  //     `,
  //       [userId, card.card_id],
  //     );
  //   });

  //   await Promise.all(updateQueries); // update multiple cards in parallel
  //}

  return cardsToDraw;
};

module.exports = { drawCards };
