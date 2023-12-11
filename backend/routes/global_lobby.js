const express = require("express");
const { availableGamesForUser } = require("../db/games");
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const userId = request.session.userId;

    const availableGames = await availableGamesForUser(userId);

    response.render("global_lobby", { availableGames });
  } catch (error) {
    console.error("Error fetching data for global lobby:", error);
    response.status(500).send("Error loading global lobby");
  }
});

module.exports = router;
