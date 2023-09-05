const mysql = require("mysql2/promise");
async function CreateTables() {
  let connection = mysql.createPool({
    host: "localhost",
    user: "academia-api",
    password: "6414",
    port: "3306",
  });
  console.log("Creating database...");
  await connection.query("DROP DATABASE IF EXISTS `migration-test`");
  await connection.query("CREATE DATABASE `migration-test`");

  connection = mysql.createPool({
    host: "localhost",
    user: "academia-api",
    password: "6414",
    database: "migration-test",
    port: "3306",
  });

  console.log("User tables creation started...");
  const [result] = await connection.query(
    "CREATE TABLE `user` (id int AUTO_INCREMENT PRIMARY KEY, name varchar(64) NOT NULL, email varchar(64) NOT NULL, cpf char(11) NOT NULL, password varchar(128) NOT NULL, birthdate date NOT NULL)"
  );
  console.log(result);
}

CreateTables();
