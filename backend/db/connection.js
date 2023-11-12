const pgp = require("pg-promise")();

const connection = pgp(process.env.DATABASE_URL);
const db = pgp({
    user: 'student',
    password: 'student',
    host: 'localhost',
    port: 5432, // Change to your PostgreSQL port if different
    database: 'test'
  });
  
    db.connect()
      .then(obj => {
          obj.done(); // success, release the connection;
          console.log('Connected to the database');
      })
      .catch(error => {
          console.error('Error connecting to the database:', error);
      });
  

module.exports = db;