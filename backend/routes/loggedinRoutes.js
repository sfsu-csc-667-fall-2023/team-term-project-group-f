// Import required modules
const express = require("express");
const router = express.Router();

// Import the isAuthenticated middleware
const { isAuthenticated } = require("../middleware");

// Handle GET request for /loggedin
router.get("/", isAuthenticated, (req, res) => {
  res.render("loggedin");
});

// Export the router
module.exports = router;