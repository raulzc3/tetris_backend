const sqlite = require("sqlite3");

let sql = "";

const handleError = (error) => {
  if (error) {
    console.error(error);
    throw error;
  }
};

const db = new sqlite.Database(
  "./tetrisData.db",
  sqlite.OPEN_READWRITE,
  handleError
);

// Create db if not exists
sql = `CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name CHAR(3) NOT NULL,
    score INTEGER NOT NULL
)`;

db.run(sql, handleError);

function insertData(values = []) {
  if (values.length > 0) {
    sql = `INSERT INTO scores (name, score) VALUES (?, ?)`;
    db.run(sql, values, handleError);
    return true;
  }
}

const query = (queryString, params) => {
  return new Promise((resolve, reject) => {
    db.all(queryString, params, (err, data) => {
      if (err) {
        console.log("Error in query: ", queryString);
        console.error(err);
        reject(err);
        return;
      }

      resolve(data);
    });
  });
};

const findWithLimit = (limit) => {
  sql = `SELECT name, score 
            FROM scores 
            ORDER BY score DESC
            LIMIT ?`;

  return query(sql, [limit]);
};

module.exports = { findWithLimit, insertData, query };
