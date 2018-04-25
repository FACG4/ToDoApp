const dbConnection = require('../db_connection.js');

const getUsersInfo = (cb) => {
  const sql = `select name , id , role from users`;
  dbConnection.query(sql, (error, result) => {
    if (error) cb(error)
    cb(null, result.rows);
  })
}

const getListItemsForUser = (user_id, cb) => {
  const sql = `select l.id as listId , l.todoItem , l.done , u.id , u.name , u.bio from users u join listTodo l on  l.userId =u.id where u.id= ${user_id}`;

  dbConnection.query(sql, (error, result) => {
    if (error) cb(error)
    cb(null, result.rows);
  })
}

const getUserName = (user_id, cb) => {
  const sql = `select id , name , bio from users where id= ${user_id}`;

  dbConnection.query(sql, (error, result) => {
    if (error) cb(error)
    cb(null, result.rows);
  })
}


module.exports = {
  getUsersInfo,
  getListItemsForUser,
  getUserName
};
