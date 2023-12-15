const express = require("express");
const { availableGamesForUser } = require("../db/games");
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const userId = request.session.userId;

    const user = request.session.user; // assuming user details are stored in session

    const availableGames = await availableGamesForUser(userId);

    response.render("global_lobby", { availableGames, user: user });
  } catch (error) {
    console.error("Error fetching data for global lobby:", error);
    response.status(500).send("Error loading global lobby");
  }
});

module.exports = router;
