const { query, connectToDBReadWrite } = require("../database");

/**
 * Get all scores from database
 * @param {Number} limit
 * @returns
 */
const getAllScoresFromDB = async (limit = 100) => {
  const sql = `SELECT * 
            FROM scores
            ORDER BY score DESC
            LIMIT ?`;

  const allScores = await query(sql, [limit]);

  return allScores;
};

/**
 * Store one score into db
 * @param {Object} data - Data to be stored
 * @param {string} data.name - User name
 * @param {number} data.score - User score
 * @returns
 */
function insertScore({ name, score }) {
  const connection = connectToDBReadWrite();
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO scores (name, score) VALUES (?, ?)`;

    connection.run(sql, [name, score], (err) => {
      connection.close();
      if (err) {
        console.log("Error during score insertion:");
        console.error(err);
        reject(false);
        return;
      }

      resolve(true);
    });
  });
}

module.exports = { getAllScoresFromDB, insertScore };
