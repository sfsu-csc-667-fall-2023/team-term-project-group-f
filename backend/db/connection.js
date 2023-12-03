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

  /*
    db.connect()
      .then(obj => {
          obj.done(); // success, release the connection;
          console.log('Connected to the database');
      })
      .catch(error => {
          console.error('Error connecting to the database:', error);
      });
      */

module.exports = connection;