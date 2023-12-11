const express = require("express");
const router = express.Router();

// router.get("/:id", (request, response) => {
//   const { id } = request.params;
//   response.render("game", { id: result.id });
// });

router.get("/:id", (request, response) => {
  const gameId = request.params.id;
  response.render("game", { id: gameId });
});

module.exports = router;
