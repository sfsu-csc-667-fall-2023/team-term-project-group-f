const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
  const name = "Team F";
  response.render('root', { name });

  //response.send("Hello world from within a route!");
})

module.exports = router;