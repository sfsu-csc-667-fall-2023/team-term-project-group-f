const express = require("express");
const router = express.Router();

router.get("/", (_request, response) => {
  console.log("GET global_lobby");
  response.render("global_lobby");
});

module.exports = router;
