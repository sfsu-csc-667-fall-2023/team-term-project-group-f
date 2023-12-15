const express = require("express");
const router = express.Router();
const { Games } = require("../db");

// router.get("/:id", (request, response) => {
//   const { id } = request.params;
//   response.render("game", { id: result.id });
// });

router.get("/:id", async (request, response) => {
  const gameId = request.params.id;
  const { id } = request.session.user;

  try {
    const gameDetails = await Games.getGame(gameId);
    const myCards = await Games.getCardsForUser(id, gameId);
    const currentPlayer = await Games.getCurrentPlayer(gameId);
    const lastCard = await Games.getLastCard(gameId); // build last card logic

    response.render("game", {
      id: gameId,
      gameDetails: gameDetails,
      myCards: myCards,
      currentPlayer: currentPlayer,
      lastCard: lastCard,
    });
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
  const { id } = request.session.user;

  try {
    await Games.drawCards(gameId, id, 1); // logic to draw a card from the deck

    response.redirect(`/game/${gameId}`); // back to the game page
  } catch (error) {
    console.error("Error drawing a card:", error);
    response.status(500).send("Error drawing a card");
  }
});

module.exports = router;
