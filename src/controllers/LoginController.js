const { json } = require("express");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");
require("dotenv").config();

const generateToken = async (req, res) => {
  const { email } = req.body;

  const jwtToken = jwt.sign(
    { userEmail: email },
    process.env.JWT_TOKEN_SECRET,
    {
      expiresIn: 3600,
    }
  );
  res.status(200).json({ token: jwtToken, id: res.locals.id });
};

const createUser = async (request, response) => {
  let connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    connectionLimit: 1,
  });

  const query =
    "INSERT INTO user(name, cpf, email, password, birthdate, academycode, registerstatus) VALUES (?, ?, ?, ?, ?, ?, ?)";

  const body = request.body;
  const [rows] = await connection.execute(query, [
    body.name,
    body.cpf,
    body.email,
    body.password,
    body.birthdate.substr(0, 10),
    body.academycode,
    "waiting",
  ]);

  connection.end();
  response.status(201).json();
};

const changePassword = async (request, response) => {
  let connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    connectionLimit: 1,
  });

  const body = request.body;
  const [rows] = await connection.query(
    "UPDATE `user` SET password = ? WHERE cpf = ? LIMIT 1",
    [body.newpassword, body.cpf]
  );
  console.log(rows.affectedRows);
  connection.end();

  if (rows.affectedRows === 0) {
    return response.status(500).json({ message: "internal server error" });
  }
  return response.status(200).json();
};

module.exports = {
  createUser,
  generateToken,
  changePassword,
};
