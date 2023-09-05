const { json } = require("express");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");

const generateToken = async (req, res) => {
  const { email } = req.body;

  const jwtToken = jwt.sign(
    { userEmail: email },
    process.env.JWT_TOKEN_SECRET,
    {
      expiresIn: 3600,
    }
  );
  res.status(200).json({ token: jwtToken });
};

const createUser = async (request, response) => {
  let connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
  });

  const body = request.body;

  const query = "INSERT INTO user(cpf,email,password) VALUES (?, ?, ?)";

  const [rows] = await connection.execute(query, [
    body.cpf,
    body.email,
    body.password,
  ]);

  console.log(rows.affectedRows);
  connection.end();
  return response.status(201).json();
};

module.exports = {
  createUser,
  generateToken,
};
