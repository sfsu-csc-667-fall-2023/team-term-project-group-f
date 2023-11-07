const pgp = require("pg-promise")();

console.log(process.env.DATABASE_URL)

const connection = pgp(process.env.DATABASE_URL);
module.exports = connection;