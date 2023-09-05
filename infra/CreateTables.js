const mysql = require("mysql2/promise");
require("dotenv").config();

async function CreateTables() {
  let connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
  });
  console.log("Creating database...");
  console.log(process.env.DATABASE_NAME);
  let response;
  response = await connection.query(
    "DROP DATABASE IF EXISTS `" + process.env.DATABASE_NAME + "`"
  );
  console.log(response);

  response = await connection.query(
    "CREATE DATABASE `" + process.env.DATABASE_NAME + "`"
  );
  console.log(response);

  connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
  });

  console.log("User tables creation started...");
  response = await connection.query(
    "CREATE TABLE `user` (id int AUTO_INCREMENT PRIMARY KEY, name varchar(64) NOT NULL, email varchar(64) NOT NULL, cpf char(11) NOT NULL, password varchar(128) NOT NULL, birthdate date NOT NULL)"
  );
  console.log(response);
}

CreateTables();
