const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const SALT_ROUNDS = 10;

const { Users } = require("../db");

router.get("/sign_up", (_request, response) => {
  response.render("sign_up");
});

router.post("/sign_up", async (request, response) => {
  console.log("POST sign_up triggered");
  const { email, password } = request.body;

  const user_exists = await Users.email_exists(email);

  if (user_exists) {
    response.redirect("/");
    return;
  }

  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  const { id } = await Users.create(email, hash);

  request.session.user = {
    id: id,
    email,
  };

  response.redirect("/lobby");
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

      response.redirect("/lobby");
      return;
    } else {
      response.render("landing", {
        error: "The credentials you supplied are invalid.",
      });
    }
  } catch (error) {
    console.log(error);
    response.render("landing", {
      error: "The credentials you supplied are invalid.",
    });
  }
});

router.get("/logout", (request, response) => {
  response.redirect("/");
});

module.exports = router;
