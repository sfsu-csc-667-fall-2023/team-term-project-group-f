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

router.post("/join_game", async (request, response) => {
  const userId = request.session.userId; // Replace with actual user ID retrieval logic
  const { gameId } = request.body;

  console.log(request.session);

  try {
    await Games.addUser(userId, gameId);

    // Redirect to the game page or waiting lobby
    response.redirect(`/game/${gameId}`);
  } catch (error) {
    console.error("Error joining game:", error);
    response.status(500).send("Error joining game");
  }
});

module.exports = router;
