// Import required modules
const express = require("express");
const router = express.Router();

// Handle GET request for /loggedin
router.get("/", (req, res) => {
  res.render("loggedin");
});

// Export the router
module.exports = router;
