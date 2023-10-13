const { json } = require("express");
const mysql = require("mysql2/promise");

async function getCategories(req, res) {
  let connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    connectionLimit: 1,
  });

  const [categories] = await connection.query(
    "SELECT category FROM `training` WHERE name IS NULL"
  );

  connection.end();
  return res.status(200).json(categories);
}
module.exports = {
  getCategories,
};
