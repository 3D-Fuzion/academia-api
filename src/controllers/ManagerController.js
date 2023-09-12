const mysql = require("mysql2/promise");
require("dotenv").config();

async function acceptSolicitaction(req, res) {
  let connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    connectionLimit: 1,
  });

  const body = req.body;

  await connection.query("UPDATE `user` SET registerStatus = ? WHERE id= ?", [
    body.statusvalue,
    body.userid,
  ]);
  connection.end();
  res.status(200).end();
}

async function checkSolicitations(req, res) {
  let connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    connectionLimit: 1,
  });

  const [queryResult] = await connection.query(
    "SELECT * FROM `user` WHERE registerStatus = 'waiting'"
  );

  connection.end();
  res.status(200).json(queryResult);
}

module.exports = {
  acceptSolicitaction,
  checkSolicitations,
};
