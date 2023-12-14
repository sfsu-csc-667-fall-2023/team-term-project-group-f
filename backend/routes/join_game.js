const express = require("express");
const router = express.Router();

router.get("/", (_request, response) => {
  const name = "ANH";
  response.render("join_game", { name });
});

module.exports = router;
