const mysql = require("mysql2/promise");
require("dotenv").config();

async function CreateDB() {
  let connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    connectionLimit: 2,
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
  let connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    connectionLimit: 2,
  });

  console.log("Inserting Tables...");

  response = await connection.query(
    "CREATE TABLE `user` (id int AUTO_INCREMENT PRIMARY KEY, name varchar(64) NOT NULL, email varchar(64) NOT NULL, cpf char(11) NOT NULL, password varchar(128) NOT NULL, birthdate date NOT NULL, academyCode int(8) NOT NULL,registerStatus enum('waiting', 'accepted') NOT NULL)"
  );
  console.log("Users table added");

  response = await connection.query(
    "CREATE TABLE `academy` (id int AUTO_INCREMENT PRIMARY KEY, name varchar(64) NOT NULL, code int NOT NULL)"
  );
  console.log("Academy table added");

  response = await connection.query(
    "INSERT INTO `academy` (name, code) VALUES ('DefaultAcademy', '88888888')"
  );
  console.log("Academy data insert");

  response = await connection.query(
    "CREATE TABLE `record` (id int AUTO_INCREMENT PRIMARY KEY, userId int NOT NULL, trainingId int NOT NULL, weight int NOT NULL)"
  );
  console.log("Record table added");

  response = await connection.query(
    "CREATE TABLE `training` (id int AUTO_INCREMENT PRIMARY KEY, name varchar(64), category varchar(64))"
  );
  console.log("Training table added");

  connection.end();
}

async function CreateDataBase() {
  await CreateDB();
  await CreateTables();
  console.log("Migration Run Sucessfuly");
}

CreateDataBase();
