const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
const validadeCreateUserBody = async (req, res, next) => {
  let connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    connectionLimit: 1,
  });

  const { body } = req;

  console.log(body);

  if (isNaN(body.cpf)) {
    res.status(400).json({ message: "CPF must be only numbers" });
  }

  if (body.cpf.length != 11) {
    res.status(400).json({ message: "CPF format is incorrect" });
  }

  if (body.academycode.length != 8) {
    res.status(400).json({ message: "ACADEMY_CODE format is incorrect" });
  }

  if (body.password.length < 8) {
    res
      .status(400)
      .json({ message: "PASSWORD lenght is less than 8 characters" });
  }

  const [rows] = await connection.query(
    "SELECT SQL_SMALL_RESULT SQL_NO_CACHE 1 FROM `user` WHERE `email` = ?",
    body.email
  );

  connection.end();
  next();
};
const validadeCredentialsBody = async (req, res, next) => {
  const { email, password } = req.body;

  if (email === undefined) {
    res.status(400).json({ message: "EMAIL is required" });
  }

  if (email === "") {
    res.status(400).json({ message: "EMAIL cannot by empty" });
  }

  if (password === undefined) {
    res.status(400).json({ message: "PASSWORD is required" });
  }

  if (password === "") {
    res.status(400).json({ message: "PASSWORD cannot by empty" });
  }

  let connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
  });

  const [queryResult] = await connection.query(
    "SELECT email, password FROM `user` WHERE email= ?",
    [email]
  );

  if (queryResult[0] === undefined) {
    res.status(404).json({ message: "No entry with this email is detected" });
  }

  if (queryResult[0].password != password) {
    res.status(400).json({ message: "Password is incorrect" });
  }

  next();
};
const verifyToken = async (req, res, next) => {
  const token = req.headers["auth-token"];
  if (token === undefined) {
    res.status(401).json({ message: "Please send token in auth-token" });
  }
  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).end();
    }
    next();
  });
};
module.exports = {
  verifyToken,
  validadeCreateUserBody,
  validadeCredentialsBody,
};
