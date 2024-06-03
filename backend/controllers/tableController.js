const { group } = require("console");
const db = require("../database.js");

const tableController = {};

tableController.addUsers = (req, res, next) => {
  let { name, dob } = req.body;

  let checkUserQuery = `SELECT id FROM Users Where name = ? AND dob = ?`;

  db.get(checkUserQuery, [name, dob], function (err, user) {
    if (err) {
      console.log("Error checking user:", err.message);
      return res.status(500).send("Error checking user");
    }

    if (user) {
      req.userId = user.id;
      next();
    } else {
      let query = `INSERT INTO Users (name, dob) VALUES (?, ?)`;

      db.run(query, [name, dob], function (err) {
        if (err) {
          console.log("Error inserting user:", err.message);
          return res.status(500).send("Error inserting user");
        }
        req.userId = this.lastID;
        next();
      });
    }
  });
};

tableController.addUserResponse = (req, res, next) => {
  let { happy, energy, hope, sleep_hours } = req.body;

  let userId = req.userId;

  let currentDate = new Date().toISOString().slice(0, 10);

  let responseQuery = `INSERT INTO Responses (user_id, response_date, happy, energy, hope, sleep_hours) VALUES (?, ?, ?, ?, ?, ?)`;

  db.run(
    responseQuery,
    [userId, currentDate, happy, energy, hope, sleep_hours],
    (err) => {
      if (err) {
        console.log("Error inserting response:", err.message);
        return res.status(500).send("Error inserting response");
      }
      next();
    }
  );
};

tableController.returnUserResults = (req, res, next) => {
  const { dob } = req.body;

  const todaysDate = new Date().toISOString().slice(0, 10);

  const getAllResponseQuery = `SELECT * FROM Responses WHERE user_id = ?`;

  const getCurrentResponseQuery = `SELECT * FROM Responses WHERE user_id = ? AND response_date = ?`;

  const getAvgResponseQuery = `SELECT AVG(happy) AS avg_happy, AVG(energy) AS avg_energy, AVG(hope) AS avg_hope, AVG(sleep_hours) AS avg_sleep_hours FROM Responses WHERE user_id = ?`;

  const getAvgResponseOfSimilarAge = `SELECT AVG(happy) AS avg_happy, AVG(energy) AS avg_energy, AVG(hope) AS avg_hope, AVG(sleep_hours) AS avg_sleep_hours FROM Responses WHERE user_id IN (SELECT id FROM Users WHERE SUBSTR(dob, 1, 4) = SUBSTR(?, 1, 4))`;

  const getAvgOfAgeGroups = `SELECT R.happy, R.energy, R.hope, R.sleep_hours, (strftime('%Y', 'now') - strftime('%Y', U.dob)) AS age FROM Responses R JOIN Users U ON R.user_id = U.id`;

  const userId = req.userId;

  db.all(getAllResponseQuery, [userId], (err, allResponse) => {
    if (err) {
      console.log("Error getting all responses:", err.message);
      return res.status(500).json({ error: "Server Error" });
    }

    db.get(
      getCurrentResponseQuery,
      [userId, todaysDate],
      (err, currentResponse) => {
        if (err) {
          console.log("Error getting current responses:", err.message);
          return res.status(500).json({ error: "Server Error" });
        }

        db.get(getAvgResponseQuery, [userId], (err, averageResponse) => {
          if (err) {
            console.log("Error getting average responses:", err.message);
            return res.status(500).json({ error: "Server Error" });
          }
          db.get(getAvgResponseOfSimilarAge, [dob], (err, avgOfSimilarAge) => {
            if (err) {
              console.log(
                "Error getting average of similar age responses:",
                err.message
              );
              return res.status(500).json({ error: "Server Error" });
            }

            db.all(getAvgOfAgeGroups, (err, ageGroupData) => {
              if (err) {
                console.log("Error getting age group:", err.message);
                return res.status(500).json({ error: "Server Error" });
              }

              // console.log('This is age group data SQL query', ageGroupData);

              const ageRanges = [
                { range: "0-10", min: 0, max: 10 },
                { range: "11-15", min: 11, max: 15 },
                { range: "16-21", min: 16, max: 21 },
                { range: "22-30", min: 22, max: 30 },
                { range: "31-40", min: 31, max: 40 },
                { range: "41-50", min: 41, max: 50 },
                { range: "51-70", min: 51, max: 70 },
                { range: "71-infinity", min: 71, max: Infinity },
              ];

              const groupData = ageRanges.map((group) => {
                const filteredData = ageGroupData.filter(
                  (item) => item.age >= group.min && item.age <= group.max
                );

                const avg_happy =
                  filteredData.reduce((total, curr) => total + curr.happy, 0) /
                  filteredData.length;

                const avg_energy =
                  filteredData.reduce((total, curr) => total + curr.energy, 0) /
                  filteredData.length;

                const avg_hope =
                  filteredData.reduce((total, curr) => total + curr.hope, 0) /
                  filteredData.length;

                const avg_sleep_hours =
                  filteredData.reduce(
                    (total, curr) => total + curr.sleep_hours,
                    0
                  ) / filteredData.length;

                const totalAvgAgeRange = {
                  ageRange: group.range,
                  avg_happy: avg_happy,
                  avg_energy: avg_energy,
                  avg_hope: avg_hope,
                  avg_sleep_hours: avg_sleep_hours,
                };

                return totalAvgAgeRange;
              });
              res.status(200).json({
                allResponses: allResponse,
                currentResponse: currentResponse,
                averageResponse: averageResponse,
                avgOfSimilarAge: avgOfSimilarAge,
                ageGroupAverages: groupData,
              });
            });
          });
        });
      }
    );
  });
  next();
};

module.exports = tableController;
