const database = require("../connection");
const { connection: db } = database;

const SET_INITIALIZED = `
  UPDATE games SET status=$1
  WHERE id=$2
`;

const setStatus = (gameId, status) =>
  db.none(SET_INITIALIZED, [gameId, status]);

module.exports = { setStatus };
