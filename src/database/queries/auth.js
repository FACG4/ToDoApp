const dbConnection = require("../db_connection");

const bcrypt = require("bcrypt");

const checkUsersInfo = (name, password, cb) => {
  const sql = {
    text: "SELECT * FROM users WHERE name = $1",
    values: [name]
  };
  dbConnection.query(sql, (err, res) => {
    if (err) return cb(err);
    let hashPassword = res.rows[0].hashpassword;
    bcrypt.compare(password, hashPassword, function(error, result) {
      if (error) {
        return cb({
          error,
          type: "database error"
        });
      } else if (result == true) {
        return cb(null, res.rows);
      } else {
        return cb({
          error,
          type: "password not match"
        });
      }
    });
  });
};
module.exports = {
  checkUsersInfo
};
