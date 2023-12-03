const express = require("express");
const router = express.Router();
const passport = require("passport");
const createError = require("http-errors");

// Validation function for password
const isStrongPassword = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

// Validation middleware for signup route
const validateSignup = (req, res, next) => {
  const { username, password } = req.body;

  // Validate username
  if (!username || username.length < 4) {
    return res.status(400).send({ error: "Username must be at least 4 characters." });
  }

  // Validate password
  if (!isStrongPassword(password)) {
    return res.status(400).send({
      error:
        "Password must be at least 8 characters and include at least one number, one alphabet, and one special character.",
    });
  }

  next();
};

// Handle POST request for /auth/signup
router.post("/signup", validateSignup, (req, res, next) => {
  // Redirect to login page after successful signup
  res.redirect("/login");
});

// Handle POST request for /auth/login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/loggedin",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// Export the router
module.exports = router;
