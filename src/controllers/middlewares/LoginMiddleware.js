const connection = require("../../database")
const jwt = require("jsonwebtoken");

const validadeCreateUserBody = async (req, res, next) => {
  const { body } = req;

  if (!body.email) {
    res.status(400).json({ message: "EMAIL is required" });
  }

  if (!body.cpf) {
    res.status(400).json({ message: "CPF is required" });
  }

  if (!body.password) {
    res.status(400).json({ message: "PASSWORD is required" });
  }

  if (!body.name) {
    res.status(400).json({ message: "NAME is required" });
  }

  if (!body.academycode) {
    res.status(400).json({ message: "ACADEMY_CODE is required" });
  }

  if (!body.birthdate) {
    res.status(400).json({ message: "BIRTHDATE is required" });
  }

  if (isNaN(body.cpf)) {
    res.status(400).json({ message: "CPF must be only numbers" });
  }

  if (body.cpf.length != 11) {
    res
      .status(400)
      .json({ errorCode: "2", message: "CPF format is incorrect" });
  }

  if (body.academycode.length != 8) {
    res
      .status(400)
      .json({ message: "ACADEMY_CODE format is incorrect" });
  }

  if (body.password.length < 8) {
    res.status(400).json({
      errorCode: "3",
      message: "PASSWORD lenght is less than 8 characters",
    });
  }

  const [rows] = await connection.execute(
    "SELECT SQL_SMALL_RESULT SQL_NO_CACHE 1 FROM `user` WHERE `email` = ?",
    body.email
  );

  if (rows.length > 0) {
    res
      .status(400)
      .json({ errorCode: "1", message: "EMAIL is already registered" })
      .end();
  }

  const [academys] = await connection.execute(
    "SELECT SQL_SMALL_RESULT SQL_NO_CACHE 1 FROM `academy` WHERE `code` = ?",
    body.academycode
  );

  if (academys.length < 1) {
    res
      .status(400)
      .json({ errorCode: "4", message: "Academy is not found" })
      .end();
  }

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

  const [result] = await connection.execute(
    "SELECT email, password, registerStatus, id, cpf, name FROM `user` WHERE email= ?",
    [email]
  );

  if (result[0] === undefined) {
    res.status(404).json({ message: "No entry with this email is detected" });
  }

  if (result[0].registerStatus === "waiting") {
    res.status(403).json({ errorCode: "5", message: "User is not accepted" });
  }

  if (result[0].password != password) {
    res.status(400).json({ message: "Password is incorrect" });
  }

  res.locals.id = result[0].id;
  res.locals.email = result[0].email;
  res.locals.cpf = result[0].cpf;
  res.locals.name = result[0].name;
  
  next();
};

const validadeChangePwdBody = async (req, res, next) => {
  const { body } = req;

  if (body.newpassword.length < 8) {
    res.status(400).json({
      errorCode: "3",
      message: "PASSWORD lenght is less than 8 characters",
    });
  }
  const [rows] = await connection.execute(
    "SELECT * FROM `user` WHERE email = ?",
    [body.email]
  );
  if (rows[0] === undefined) {
    res
      .status(404)
      .json({ message: "User with this email is not founded" });
  }
  if (rows[0].cpf != body.cpf) {
    res
      .status(400)
      .json({ errorCode: "6", message: "Cpf is incorrect" });
  }
  next();
};

const verifyToken = async (req, res, next) => {
  const token = req.headers["auth-token"];
  if (token === undefined) {
    res.status(401).json({ message: "Please send token in auth-token" });
  } else {
    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).end();
      }
      next();
    });
  }
};
module.exports = {
  verifyToken,
  validadeCreateUserBody,
  validadeCredentialsBody,
  validadeChangePwdBody,
};
