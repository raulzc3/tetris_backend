const { connectToDBReadWrite } = require("./database");

const connection = connectToDBReadWrite();

// Create db if not exists
const sql = `CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name CHAR(3) NOT NULL,
    score INTEGER NOT NULL
)`;

connection.run(sql, (error) => {
  console.log("Error generating database:");
  console.log(error);
});

connection.close();
