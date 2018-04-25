const dbConnection = require('../db_connection.js');

const deleteUser = (id , cb)=>{
  const sql = 'delete from users where id='+ id;
  dbConnection.query(sql , (error,result)=>{
    if(error)cb(error)
    cb(null,result.rows);
  })
}

module.exports = {deleteUser};
