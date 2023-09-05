const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "localhost",
  user: "academia-api",
  password: "6414",
  database: "academia-dev",
  port: "3306",
  connectionLimit: 2,
});

module.exports = connection;
