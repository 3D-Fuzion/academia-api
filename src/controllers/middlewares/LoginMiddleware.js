const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const validadeCreateUserBody = async (req, res, next) => {
  let connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    connectionLimit: 2,
  });

  const { body } = req;

  if (!body.email) {
    return res.status(400).json({ message: "EMAIL is required" });
  }

  if (!body.cpf) {
    return res.status(400).json({ message: "CPF is required" });
  }

  if (!body.password) {
    return res.status(400).json({ message: "PASSWORD is required" });
  }

  if (!body.name) {
    return res.status(400).json({ message: "NAME is required" });
  }

  if (!body.academycode) {
    return res.status(400).json({ message: "ACADEMY_CODE is required" });
  }

  if (!body.birthdate) {
    return res.status(400).json({ message: "BIRTHDATE is required" });
  }

  if (isNaN(body.cpf)) {
    return res.status(400).json({ message: "CPF must be only numbers" });
  }

  if (body.cpf.length != 11) {
    return res
      .status(400)
      .json({ errorCode: "2", message: "CPF format is incorrect" });
  }

  if (body.academycode.length != 8) {
    return res
      .status(400)
      .json({ message: "ACADEMY_CODE format is incorrect" });
  }

  if (body.password.length < 8) {
    return res.status(400).json({
      errorCode: "3",
      message: "PASSWORD lenght is less than 8 characters",
    });
  }

  const [rows] = await connection.query(
    "SELECT SQL_SMALL_RESULT SQL_NO_CACHE 1 FROM `user` WHERE `email` = ?",
    body.email
  );

  if (rows.length > 0) {
    return res
      .status(400)
      .json({ errorCode: "1", message: "EMAIL is already registered" })
      .end();
  }

  const [academys] = await connection.query(
    "SELECT SQL_SMALL_RESULT SQL_NO_CACHE 1 FROM `academy` WHERE `code` = ?",
    body.academycode
  );

  if (academys.length < 1) {
    return res
      .status(400)
      .json({ errorCode: "4", message: "Academy is not found" })
      .end();
  }
  connection.end();
  next();
};
const validadeCredentialsBody = async (req, res, next) => {
  const { email, password } = req.body;

  if (email === undefined) {
    return res.status(400).json({ message: "EMAIL is required" });
  }

  if (email === "") {
    return res.status(400).json({ message: "EMAIL cannot by empty" });
  }

  if (password === undefined) {
    return res.status(400).json({ message: "PASSWORD is required" });
  }

  if (password === "") {
    return res.status(400).json({ message: "PASSWORD cannot by empty" });
  }

  let connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
  });

  const [queryResult] = await connection.query(
    "SELECT email, password, registerStatus FROM `user` WHERE email= ?",
    [email]
  );

  if (queryResult[0] === undefined) {
    return res
      .status(404)
      .json({ message: "No entry with this email is detected" });
  }
  if (queryResult[0].registerStatus === "waiting") {
    return res
      .status(403)
      .json({ errorCode: "5", message: "User is not accepted" });
  }

  if (queryResult[0].password != password) {
    return res.status(400).json({ message: "Password is incorrect" });
  }

  next();
};

const validadeChangePwdBody = async (req, res, next) => {
  let connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    connectionLimit: 1,
  });

  const body = req.body;
  if (body.newpassword.length < 8) {
    return res.status(400).json({
      errorCode: "3",
      message: "PASSWORD lenght is less than 8 characters",
    });
  }
  const [rows] = await connection.execute(
    "SELECT SQL_SMALL_RESULT SQL_NO_CACHE * FROM `user` WHERE email = ?",
    [body.email]
  );
  if (rows[0] === undefined) {
    return res
      .status(404)
      .json({ message: "User with this email is not founded" });
  }
  console.log(rows[0]);
  if (rows[0].cpf != body.cpf) {
    return res
      .status(400)
      .json({ errorCode: "6", message: "Cpf is incorrect" });
  }
  next();
};

const verifyToken = async (req, res, next) => {
  const token = req.headers["auth-token"];
  if (token === undefined) {
    return res.status(401).json({ message: "Please send token in auth-token" });
  }
  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).end();
    }
    next();
  });
};
module.exports = {
  verifyToken,
  validadeCreateUserBody,
  validadeCredentialsBody,
  validadeChangePwdBody,
};
