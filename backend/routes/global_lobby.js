const express = require("express");
const { Games } = require("../db");
const router = express.Router();

router.get("/", async (request, response) => {
  const { id } = request.session.user;

  const availableGames = await Games.availableGamesForUser(id);
  const currentGames = await Games.currentGamesForUser(id);

  response.render("global_lobby", { availableGames, currentGames });
});

module.exports = router;
