const mysql = require("mysql2/promise");
require("dotenv").config();

async function CreateDB() {
  const connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    connectionLimit: 1,
  });
  console.log("Creating database...");
  let response;
  response = await connection.query(
    "DROP DATABASE IF EXISTS `" + process.env.DATABASE_NAME + "`"
  );
  console.log(response);
  response = await connection.query(
    "CREATE DATABASE `" + process.env.DATABASE_NAME + "`"
  );
  console.log(response);
  connection.end();
}

async function CreateTables() {
  const connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
  });

  console.log("Inserting Tables...");
  response = await connection.query(
    "CREATE TABLE `user` (id int AUTO_INCREMENT PRIMARY KEY, name varchar(64) NOT NULL, email varchar(64) NOT NULL, cpf char(11) NOT NULL, password varchar(128) NOT NULL, birthdate date NOT NULL, academyCode int(8) NOT NULL,registerStatus enum('waiting', 'accepted') NOT NULL)"
  );

  console.log("Users table added");
  response = await connection.query(
    "CREATE TABLE `academy` (id int AUTO_INCREMENT PRIMARY KEY, name varchar(64) NOT NULL, code int NOT NULL)"
  );
  console.log("Academy tables added");
  console.log(response);
  connection.end();
}

async function CreateDataBase() {
  await CreateDB();
  await CreateTables();
  console.log("Migration Run Sucessfuly");
}

CreateDataBase();
