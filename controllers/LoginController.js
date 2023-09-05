const mysql = require("mysql2/promise");

const createUser = async (request, response) => {
  const connection = mysql.createPool({
    host: "localhost",
    user: "academia-api",
    password: "6414",
    database: "academia-dev",
    port: "3306",
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
};
