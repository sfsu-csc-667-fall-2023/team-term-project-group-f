// const express = require("express");
// const router = express.Router();

// router.get("/", (_request, response) => {
//   response.render("waiting_room");
// });

// module.exports = router;

const express = require("express");
const { Games } = require("../db");
const router = express.Router();

// GET to display the game setup page
router.get("/:id", async (request, response) => {
  const gameId = request.params.id;

  try {
    const gameDetails = await Games.getGame(gameId); // fetching game details and player list
    const players = await Games.usersInGame(gameId);

    // render waiting room with game details and player list
    response.render("waiting_room", {
      id: gameId,
      players: players,
      playerCount: players.length,
      gameDetails: gameDetails,
    });
  } catch (error) {
    console.error("Error fetching data for waiting room:", error);
    response.status(500).send("Error loading waiting room");
  }
});

// POST to create a new game
router.post("/", async (request, response) => {
  const { playerCount, playerType } = request.body; // data from set_newgame.ejs form

  try {
    const result = await Games.create(playerCount);

    // redirect to game page
    //response.status(200).send(`Game with id ${result.id} was made`);
    response.redirect(`/game/${result.id}`);
  } catch (error) {
    console.error("Error creating game:", error);
    response.status(500).send("Error creating game");
  }
});

module.exports = router;
