const sqlite3 = require("sqlite3").verbose();
const databaseFile = "myDatabase.db";

const db = new sqlite3.Database(databaseFile, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the database.");
  }
});

module.exports = db;
