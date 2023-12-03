const express = require("express");
const router = express.Router();
const db = require("../db/connection.js");

router.get("/", (req, res) => {
  console.log("Root route accessed");
  const name = "Team F";
  res.render('root', { name });
});

router.get("/test", (req, res) => {
  console.log("/test route accessed");
  db.any(
    `INSERT INTO test_table ("test_string") VALUES ($1)`,
    [`Hello on ${new Date().toLocaleDateString("en-us", {
      hour: "numeric",
      minute: "numeric",
      month: "short",
      day: "numeric",
      weekday: "long",
      year: "numeric",
    })}`]
  )
  .then(() => db.any(`SELECT * FROM test_table`))
  .then((results) => res.json(results))
  .catch((error) => {
    console.error(error);
    res.status(500).json({ error: error.message });
  });
});

module.exports = router;