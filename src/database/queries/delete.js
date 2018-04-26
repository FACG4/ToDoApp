const dbConnection = require('../db_connection.js');

const deleteUser = (user_id, cb) => {
  const sql = `DELETE FROM listTodo l USING users u WHERE l.userId = u.id and u.id = ${user_id}; DELETE FROM users u WHERE u.id = ${user_id};`;
  dbConnection.query(sql, (error, result) => {
    if (error) {
      cb(error)
      return console.log(error)
    };
    cb(null, result.rows);
  })
}

const deleteItem = (item_id, cb) => {
  const sql = `DELETE FROM listTodo WHERE id =  ${item_id};`;
  dbConnection.query(sql, (error, result) => {
    if (error) {
      cb(error)
      return console.log(error)
    };
    cb(null, result.rows);
  })
}

module.exports = {
  deleteUser,
  deleteItem
};
