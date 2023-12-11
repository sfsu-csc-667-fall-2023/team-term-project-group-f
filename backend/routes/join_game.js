const express = require("express");
const { addUser } = require("../db/games"); // Adjust the path as necessary
const router = express.Router();

router.post("/join_game", async (request, response) => {
  const userId = request.session.userId; // Replace with actual user ID retrieval logic
  const { gameId } = request.body;

  try {
    await addUser(userId, gameId);

    // Redirect to the game page or waiting lobby
    response.redirect(`/game/${gameId}`);
  } catch (error) {
    console.error("Error joining game:", error);
    response.status(500).send("Error joining game");
  }
});

module.exports = router;
