const express = require("express");
const router = express.Router();

router.get("/", (_request, response) => {
  response.render("uno_rules");
});

module.exports = router;
