const dbConnection = require("../db_connection");

const bcrypt = require("bcrypt");

const checkUsersInfo = (name, password, cb) => {
  const sql = {
    text: "SELECT * FROM users WHERE name = $1",
    values: [name]
  };
  dbConnection.query(sql, (err, res) => {
    // console.log("sdhjdshsd", res.rows[0].hashpassword);
    if (err) return cb(err);
    // console.log(res.rows[0].password, "Ahmad");
    let hashPassword = res.rows[0].hashpassword;
    // console.log(res);
    bcrypt.compare(password, hashPassword, function(error, result) {
      // console.log(result);
      if (error) {
        return cb({ error, type: "database error" });
      } else if (result == true) {
        return cb(null, res.rows);
      } else {
        return cb({ error, type: "password not match" });
      }
    });
  });
};
module.exports = { checkUsersInfo };
