console.log("DATABASE_URL:", process.env.DATABASE_URL);

const pgp = require("pg-promise")();

const connection = pgp(process.env.DATABASE_URL);

connection
  .connect()
  .then(async (obj) => {
    // Can check the server version here (pg-promise v10.1.0+):
    const serverVersion = obj.client.serverVersion;
    console.log("db connected to DB:", obj.client.database, serverVersion);

    obj.done(); // success, release the connection;
  })
  .catch((error) => {
    console.log("ERROR:", error.message || error);
  });

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

module.exports = { connection };
