const express = require("express");
const router = express.Router();

// Import the isAuthenticated middleware
const { isAuthenticated } = require("../middleware");

router.get("/", isAuthenticated, (_request, response) => {
  // If the user is authenticated, redirect to the loggedin page
  response.redirect("/loggedin");
});

module.exports = router;