// Import required modules
const express = require("express");
const router = express.Router();

// Handle GET request for /signup
router.get("/", (req, res) => {
  res.render("signup");
});

// Export the router
module.exports = router;
