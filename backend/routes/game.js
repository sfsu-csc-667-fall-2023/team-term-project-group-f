const express = require("express");
const router = express.Router();
const { Games } = require("../db");
const { getUsers } = require("../db/games/get-users");
const { getPlayerBySeat } = require("../db/games/get-player-by-seat");
const { usersInGame } = require("../db/games");

// router.get("/:id", (request, response) => {
//   const { id } = request.params;
//   response.render("game", { id: result.id });
// });

router.get("/:id", async (request, response) => {
  const gameId = request.params.id;
  const { id } = request.session.user;
  const gameUsers = await usersInGame(gameId);

  try {
    const gameDetails = await Games.getGame(gameId);

    if (gameDetails.initialized) {
      const myCards = await Games.getCardsForUser(gameId, id);
      const currentSeat = await Games.getCurrentPlayer(gameId);
      const lastCard = await Games.getLastCard(gameId); // build last card logic

      response.render("game", {
        id: gameId,
        user: id,
        gameDetails: gameDetails,
        myCards: myCards,
        currentPlayer: gameUsers.find(
          (el) => el.user_id == currentSeat.current_seat,
        ),
        lastCard: lastCard,
      });
    } else {
      response.redirect(`/waiting_room/${gameId}`);
    }
  } catch (error) {
    console.error("Error loading game:", error);
    response.status(500).send("Error loading game");
  }
});

router.post("/waiting_room", async (request, response) => {
  console.log("POST waiting_room triggered");
  // const userId = request.session.user; // Replace with actual user ID retrieval logic
  const { gameId, userId } = request.body;

  console.log(request.body);

  try {
    await Games.addUser(userId, gameId);

    // Redirect to the game page or waiting lobby
    response.redirect(`/game/${gameId}`);
  } catch (error) {
    console.error("Error joining game:", error);
    response.status(500).send("Error joining game");
  }
});

// initialize game
router.post("/:id/initialize", async (request, response) => {
  const gameId = request.params.id;
  console.log(`Initializing game #${gameId}`);

  try {
    const gameState = await Games.initialize(gameId);

    response.redirect(`/game/${gameId}`);
  } catch (error) {
    console.error("Error initializing game:", error);
    response.status(500).send("Error initializing game");
  }
});

// POST for drawing cards
router.post("/:id/draw", async (request, response) => {
  const gameId = request.params.id;
  const userId = request.session.user.id;

  try {
    const users = await getUsers(gameId);
    const cards = await Games.drawCards(gameId, 1); // logic to draw a card from the deck
    const dealtCards = await Games.dealCards(
      [users.find((el) => el.user_id == userId)],
      cards,
      gameId,
    );

    response.redirect(`/game/${gameId}`); // back to the game page
  } catch (error) {
    console.error("Error drawing a card:", error);
    response.status(500).send("Error drawing a card");
  }
});

router.post("/playCard", async (request, response) => {
  const { gameId, suit, value, card_id } = request.body;
  const userId = request.session.user.id;
  const users = await getUsers(gameId);

  try {
    // Check if the card being played is legal
    const lastCard = await Games.getLastCard(gameId); // build last card logic
    const gameDetails = await Games.getGame(gameId);
    if (suit != lastCard.suit && value != lastCard.value) {
      return response.status(400).send("Invalid card!");
    }

    // trigger logic for card
    //    if card is skip or draw 2 find the next player
    //      provide next player with a chance to play the same card
    //    if card is wild
    //      change color to one provided
    //      trigger +4 draw card if it's a draw four card

    // move card to discard
    await Games.dealCards([{ user_id: 0 }], [{ card_id }], gameId);

    // check if game is over
    const myCards = await Games.getCardsForUser(gameId, userId);
    if (myCards.length == 0) {
      await Games.setStatus(gameId, "Finished");
      response.redirect(`/game/${gameId}/finished`); // back to the game page
    }

    // update last played card in Game
    lastPlayed = Games.setLastCard(gameId, card_id);

    // next player's turn
    const index = users.findIndex(
      (el) => el.user_id == gameDetails.current_seat,
    );
    await Games.setCurrentPlayer(
      users[(index + 1) % users.length].user_id,
      gameId,
    ),
      response.redirect(`/game/${gameId}`); // back to the game page
  } catch (error) {
    console.error("Error drawing a card:", error);
    response.status(500).send("Error drawing a card");
  }
});

module.exports = router;
