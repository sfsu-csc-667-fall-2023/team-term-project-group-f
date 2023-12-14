const express = require("express");
const router = express.Router();
const { Games } = require("../db");

// router.get("/:id", (request, response) => {
//   const { id } = request.params;
//   response.render("game", { id: result.id });
// });

router.get("/:id", (request, response) => {
  const gameId = request.params.id;
  response.render("game", { id: gameId });
});

// router.post("/waiting_room", async (request, response) => {
//   const userId = request.session.userId; // Replace with actual user ID retrieval logic
//   const { gameId } = request.body;

//   console.log(request.session);

//   try {
//     await Games.addUser(userId, gameId);

//     // Redirect to the game page or waiting lobby
//     response.redirect(`/game/${gameId}`);
//   } catch (error) {
//     console.error("Error joining game:", error);
//     response.status(500).send("Error joining game");
//   }
// });

router.post("/join_game", async (request, response) => {
  console.log("POST join_game triggered");
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

  try {
    const gameState = await Games.initialize(gameId);

    response.redirect(`/game/${gameId}`);
  } catch (error) {
    console.error("Error initializing game:", error);
    response.status(500).send("Error initializing game");
  }
});

module.exports = router;
