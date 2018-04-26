const db_connection = require('../db_connection.js');

const postUser = (name, bio, hashPassword, role, cb) => {

  const sql = {
    text: `INSERT INTO users(name , bio ,hashPassword  , role) VALUES ($1 , $2 , $3 ,$4)`,
    values: [name, bio, hashPassword, role]
  }

  db_connection.query(sql, (error, res) => {
    if (error) return cb(error);
    cb(null, res);
  })

}

const postItem = (item, done, user_id, cb) => {

  const sql = {
    text: `INSERT INTO listTodo(todoItem , done , userId) VALUES ($1 , $2 , $3 )`,
    values: [item, done, user_id]
  }
  db_connection.query(sql, (error, res) => {
    if (error) {
      return console.log(error);
      cb(error)
    }
    cb(null, res);
  })

}


module.exports = {
  postUser,
  postItem
}
