const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  connectionLimit: 2,
});

module.exports = connection;
