const db = require("./database");

const usersTable = `
    CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        dob DATE NOT NULL
    )
`;

const usersResponse = `
    CREATE TABLE IF NOT EXISTS Responses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        response_date DATE NOT NULL,
        happy INTEGER,
        energy INTEGER,
        hope INTEGER,
        sleep_hours INTEGER,
        FOREIGN KEY (user_id) REFERENCES Users(id)
    )
`;

db.run(usersTable, (err) => {
  if (err) {
    console.error("Error creating Users table:", err.message);
  } else {
    console.log("Users table created successfully.");
  }
});

db.run(usersResponse, (err) => {
  if (err) {
    console.error("Error creating Responses table:", err.message);
  } else {
    console.log("Responses table created successfully.");
  }
});
