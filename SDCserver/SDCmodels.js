const db = require('../SDCdatabase');

// Homes
const query = (queryString, callback) => {
  db.connection.query(queryString, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  query,
};
