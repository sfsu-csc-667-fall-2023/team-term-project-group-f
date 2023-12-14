// const express = require("express");
// const bcrypt = require("bcrypt");
// const passport = require("passport");
// const initializePassport = require("./passport-config");

// initializePassport(
//   passport,
//   (email) => users.find((user) => user.email === email),
//   (id) => users.find((user) => user.id === id),
// );

// const router = express.Router();
// const users = [];

// // Check if the user is not authenticated or authenticated
// const checkAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/sign_in");
// };

// const checkNotAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return res.redirect("/");
//   }
//   next();
// };

// router.get("/", checkAuthenticated, (req, res) => {
//   res.render("global_lobby.ejs", { username: req.user.username });
// });

// router.get("/sign_in", checkNotAuthenticated, (req, res) => {
//   console.log("User in session:", req.user);
//   res.render("log_in.ejs");
// });

// router.get("/sign_up", checkNotAuthenticated, (req, res) => {
//   res.render("sign_up.ejs");
// });

// router.post(
//   "/sign_in",
//   checkNotAuthenticated,
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/sign_in",
//     failureFlash: true,
//   }),
// );

// router.post("/sign_up", checkNotAuthenticated, async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     users.push({
//       id: Date.now().toString(),
//       username: req.body.username,
//       email: req.body.email,
//       password: hashedPassword,
//     });
//     console.log(users);
//     res.redirect("/sign_in");
//   } catch (e) {
//     console.log(e);
//     res.redirect("/sign_up");
//   }
// });

// router.delete("/logout", (req, res) => {
//   req.logout(req.user, (err) => {
//     if (err) return next(err);
//     res.redirect("/");
//   });
// });

// module.exports = router;

const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const SALT_ROUNDS = 10;

const { Users } = require("../db");

router.get("/", (req, res) => {
  const id = 5;
  res.render("global_lobby.ejs", { id });
});

router.get("/sign_in", (req, res) => {
  // console.log("User in session:", req.user);
  res.render("log_in.ejs");
});

router.get("/sign_up", (_request, response) => {
  response.render("sign_up.ejs");
});

router.post("/sign_up", async (request, response) => {
  const { email, password } = request.body;

  const user_exists = await Users.email_exists(email);
  if (user_exists) {
    response.redirect("/");
    return;
  }

  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  const { id } = Users.create(email, hash);

  request.session.user = {
    id,
    email,
  };

  response.redirect("/sign_in");
});

router.post("/sign_in", async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await Users.find_by_email(email);
    const isValidUser = await bcrypt.compare(password, user.password);

    if (isValidUser) {
      request.session.user = {
        id: user.id,
        email,
      };
      console.log({ user, session: request.session });

      response.redirect("/");
      return;
    } else {
      response.render("log_in", {
        error: "The credentials you supplied are invalid.",
      });
    }
  } catch (error) {
    console.log(error);
    response.render("log_in", {
      error: "The credentials you supplied are invalid.",
    });
  }
});

router.get("/log_out", (request, response) => {
  response.redirect("/");
});

module.exports = router;
