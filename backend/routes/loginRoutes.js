const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // Extract the message from the query parameters
  const message = req.query.message || "";

  res.render("login", { message });
});

module.exports = router;
