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
  const myCards = await Games.getCardsForUser(gameId, id);

  console.log("myCards:", myCards);
  response.render("game", { id: gameId, myCards });
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

module.exports = router;
