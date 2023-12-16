const express = require("express");
const { Games } = require("../db");
const router = express.Router();

// GET to display the game setup page
router.get("/", (request, response) => {
  response.render("set_newgame", { query: request.query });
});

// POST to create a new game
router.post("/", async (request, response) => {
  console.log("POST set_newgame triggered!");
  const { playerCount } = request.body; // data from set_newgame.ejs form
  const { id } = request.session.user;


  try {
    const result = await Games.create(playerCount);
    await Games.addUser(id, result.id);

    console.log(result);
    if (result.error) {
      // handle the case where no game could be created or joined
      return response.status(400).redirect(`/lobby?noRoomAvailable=true`); // redirect to waiting screen
    }

    // redirect to game page
    // response.status(200).send(`Game with id ${result.id} was made`);
    response.redirect(`/waiting_room/${result.id}`);

  } catch (error) {
    console.error("Error creating game:", error);
    response.status(500).send("Error creating game");
  }
});

module.exports = router;
