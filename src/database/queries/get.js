const dbConnection = require('../db_connection.js');





const getUsersInfo = (cb)=>{
  const sql = 'select name,id from users where role=2';
  dbConnection.query(sql , (error,result)=>{
    if(error)cb(error)
    cb(null,result.rows);
  })

}


module.exports = {getUsersInfo};
