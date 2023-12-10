const express = require("express");
const router = express.Router();

// GET to display the game setup page
router.get("/", (_request, response) => {
  response.render("set_newgame");
});

// POST to create a new game
router.post("/", async (request, response) => {
  const { playerCount, playerType } = request.body; // data from set_newgame.ejs form

  try {
    // create new game in database
    const result = await db.one(
      "INSERT INTO games (max_players, status, initialized) VALUES ($1, $2, $3) RETURNING id",
      [playerCount, "waiting", false],
    );

    // redirect to game page
    response.redirect(`/game/${result.id}`);
  } catch (error) {
    console.error("Error creating game:", error);
    response.status(500).send("Error creating game");
  }
});

module.exports = router;
