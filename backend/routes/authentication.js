// authentication.js
const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("./passport-config");

initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id),
);

const router = express.Router();
const users = [];

// Check if the user is not authenticated or authenticated
const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/sign_in");
};

const checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};

router.get("/", checkAuthenticated, (req, res) => {
  res.render("global_lobby.ejs", { username: req.user.username });
});

router.get("/sign_in", checkNotAuthenticated, (req, res) => {
  console.log("User in session:", req.user);
  res.render("landing.ejs");
});

router.get("/sign_up", checkNotAuthenticated, (req, res) => {
  res.render("sign_up.ejs");
});

router.post(
  "/sign_in",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/sign_in",
    failureFlash: true,
  }),
);

router.post("/sign_up", checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    console.log(users);
    res.redirect("/sign_in");
  } catch (e) {
    console.log(e);
    res.redirect("/sign_up");
  }
});

router.delete("/logout", (req, res) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;
