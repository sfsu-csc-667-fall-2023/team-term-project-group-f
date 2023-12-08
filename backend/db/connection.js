console.log('DATABASE_URL:', process.env.DATABASE_URL);

const pgp = require("pg-promise")();

const connection = pgp(process.env.DATABASE_URL || {
  user: 'student',
  password: 'student',
  host: 'localhost',
  port: 5432,
  database: 'test'
});

console.log('Manual Connection Details:', connection);

module.exports = connection;