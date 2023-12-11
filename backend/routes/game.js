const express = require("express");
const { create } = require("../db/games");
const router = express.Router();

// router.get("/:id", (request, response) => {
//   const { id } = request.params;
//   response.render("game", { id: result.id });
// });

router.get("/:id", (request, response) => {
  const gameId = request.params.id;
  response.render("game", { id: gameId });
});

router.get("/all", (request, response) => {
  const { id } = request.params;

  response.render("game", { id });
});

router.post("/new_game", (request, response) => {
  const { maxPlayers, creatorID, password } = request.params; // TODO implement passwords on games

  // make a new game and set max players
  // create(42);
  // set the status to private and add a password if one is set

  response.render("game", { id });
});

router.get("/debug", (request, response) => {
  console.log("debug!!!");
});

module.exports = router;
