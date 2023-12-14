const express = require("express");
const { Games } = require("../db");
const router = express.Router();

router.get("/", async (request, response) => {
  console.log("GET join_game triggered!");
  const { id } = request.session.user;

  const availableGames = await Games.availableGamesForUser(id);
  const currentGames = await Games.currentGamesForUser(id);

  console.log(availableGames);
  console.log(currentGames);

  response.render("join_game", { availableGames, currentGames });
});

router.get("/:id/join", async (request, response) => {
  const { id: gameId } = request.params;
  const { id: userId } = request.session.user;

  const gameUsers = await Games.usersInGame(gameId);
  const userInGameAlready = gameUsers.includes(
    (entry) => entry.user_id === userId,
  );

  if (!userInGameAlready) {
    await Games.addUser(userId, gameId);
  }

  response.redirect(`/game/${gameId}`);
});

module.exports = router;
