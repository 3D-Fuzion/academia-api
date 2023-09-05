const mysql = require("mysql2/promise");

const validadeBody = async (request, response, next) => {
  const connection = mysql.createPool({
    host: "localhost",
    user: "academia-api",
    password: "6414",
    database: "academia-dev",
    port: "3306",
  });

  const { body } = request;

  if (isNaN(body.cpf)) {
    return response.status(400).json({ message: "CPF must be only numbers" });
  }

  if (body.cpf.length != 11) {
    return response.status(400).json({ message: "CPF format is incorrect" });
  }

  if (body.password.length < 8) {
    return response
      .status(400)
      .json({ message: "PASSWORD lenght is less than 8 characters" });
  }

  const [rows] = await connection.query(
    "SELECT SQL_SMALL_RESULT SQL_NO_CACHE 1 FROM `user` WHERE `email` = ?",
    body.email
  );

  if (rows.length != 0) {
    return response
      .status(400)
      .json({ message: "EMAIL is already registered" });
  }

  connection.end();

  next();
};

module.exports = {
  validadeBody,
};
