const http = require('http');
const router = require('./router');

const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';

const server = http.createServer(router);
server.listen(port,()=>{
  console.log(`Server running on ${host} Listening to port :${port}.`);
});
