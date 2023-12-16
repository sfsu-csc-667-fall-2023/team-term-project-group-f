// Import required modules
const express = require("express");
const router = express.Router();

// Import the isAuthenticated middleware
const { isAuthenticated } = require("../middleware");

// Handle GET request for /signup
router.get("/", isAuthenticated, (req, res) => {
  // If the user is already authenticated, redirect to the loggedin page
  res.redirect("/loggedin");
});

// Export the router
module.exports = router;