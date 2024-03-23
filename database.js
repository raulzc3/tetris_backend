const sqlite = require("sqlite3");

const handleError = (error) => {
  if (error) {
    console.log("Error connecting to database:");
    console.error(error);
  }
};
//Database connection methods:

const connectToDBReadOnly = () =>
  new sqlite.Database("./tetrisData.db", sqlite.OPEN_READONLY, handleError);

const connectToDBReadWrite = () =>
  new sqlite.Database("./tetrisData.db", sqlite.OPEN_READWRITE, handleError);

/**
 * Get data from database
 * @param {String} queryString
 * @param {Array} params
 * @returns
 */
const query = (queryString, params) => {
  const connection = connectToDBReadOnly();
  return new Promise((resolve, reject) => {
    connection.all(queryString, params, (err, data) => {
      connection.close();
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

module.exports = { connectToDBReadOnly, connectToDBReadWrite, query };
