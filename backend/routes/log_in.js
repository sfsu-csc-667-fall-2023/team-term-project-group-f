const express = require("express");
const router = express.Router();

router.get("/", (_request, response) => {
  response.render("log_in");
});

module.exports = router;
