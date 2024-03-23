const { connectToDBReadWrite } = require("./database");

const connection = connectToDBReadWrite();

// Create db if not exists
let sql = `DROP TABLE IF EXISTS scores;`;
connection.run(sql, (error) => {
  if (error) {
    console.log("Error deleting database:");
    console.log(error);
  } else {
    console.log("Table scores dropped");
  }
});

// Create db if not exists
sql = `CREATE TABLE IF NOT EXISTS scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name CHAR(3) NOT NULL,
  score INTEGER NOT NULL
)`;

connection.run(sql, (error) => {
  if (error) {
    console.log("Error generating database:");
    console.log(error);
  } else {
    console.log("Table scores created");
  }
});

connection.close();
