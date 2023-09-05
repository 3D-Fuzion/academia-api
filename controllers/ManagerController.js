const mysql = require("mysql2/promise");

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

  const [queryResult] = await connection.query(
    "UPDATE `user` SET registerStatus = ? WHERE id= ?",
    [body.statusvalue, body.userid]
  );
  connection.end();
  res.status(200).end();
}

module.exports = {
  acceptSolicitaction,
};
