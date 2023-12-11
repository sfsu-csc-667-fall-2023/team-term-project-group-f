const express = require("express");
const { Games } = require("../db");
const router = express.Router();

// GET to display the game setup page
router.get("/", (request, response) => {
  response.render("set_newgame", { query: request.query });
});

// POST to create a new game
router.post("/", async (request, response) => {
  const { playerCount } = request.body; // playercount from set_newgame.ejs form

  try {
    const result = await Games.create(playerCount);

    if (result.error) {
      // handle the case where no game could be created or joined
      return response.status(400).redirect(`/lobby?noRoomAvailable=true`); // redirect to waiting screen
    }
    // redirect to game page
    response.redirect(`/game/${result.id}`);
  } catch (error) {
    console.error("Error creating game:", error);
    response.status(500).send("Error creating game");
  }
});

module.exports = router;
