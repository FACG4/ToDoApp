const { Pool } = require("pg");
const url = require("url");
require("env2")("./config.env");

if (!process.env.DB_URL) {
  throw new Error("error11111");
}

const parms = url.parse(process.env.DB_URL);
const [username, password] = parms.auth.split(":");

const options = {
  host: parms.hostname,
  port: parms.port,
  database: parms.pathname.split("/")[1],
  user: username,
  password
};

module.exports = new Pool(options);
