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
    "CREATE TABLE `user` (" +
      "id int AUTO_INCREMENT PRIMARY KEY," +
      "name varchar(64) NOT NULL," +
      "email varchar(64) NOT NULL," +
      "cpf char(11) NOT NULL," +
      "password varchar(128) NOT NULL," +
      "birthdate date NOT NULL," +
      "academyCode int(8) NOT NULL," +
      "registerStatus enum('waiting', 'accepted') NOT NULL," +
      "sex varchar(16)," +
      "effectPhrase varchar(128)," +
      "likes int," +
      "stars int," +
      "imageUrl varchar(255))"
  );
  console.log("Users table added");

  response = await connection.query(
    "CREATE TABLE `academy` (" +
      "id int AUTO_INCREMENT PRIMARY KEY," +
      "name varchar(64) NOT NULL, code int NOT NULL)"
  );

  console.log("Academy table added");

  response = await connection.query(
    "CREATE TABLE `stars` (" +
      "id int AUTO_INCREMENT PRIMARY KEY," +
      "name varchar(64) NOT NULL, code int NOT NULL)"
  );

  console.log("Star table added");

  response = await connection.query(
    "CREATE TABLE `likes` (" +
      "id int AUTO_INCREMENT PRIMARY KEY," +
      "userid int," + 
      "publiid int)"  
  );

  console.log("Like table added");

  response = await connection.query(
    "CREATE TABLE `manager` (" +
      "id int AUTO_INCREMENT PRIMARY KEY," +
      "name varchar(64) NOT NULL," +
      "email varchar(64) NOT NULL," +
      "password varchar(128) NOT NULL)"
  );

  console.log("Manager table added");

  response = await connection.query(
    "INSERT INTO `academy`" +
      "(name, code)" +
      "VALUES" +
      "('DefaultAcademy', '88888888')"
  );
  console.log("Academy data insert");

  response = await connection.query(
    "CREATE TABLE `record` (" +
      "id int AUTO_INCREMENT PRIMARY KEY," +
      "userId int NOT NULL," +
      "trainingId int NOT NULL," +
      "weight int NOT NULL)"
  );
  console.log("Record table added");

  response = await connection.query(
    "CREATE TABLE `training` (" +
      "id int AUTO_INCREMENT PRIMARY KEY," +
      "name varchar(64)," +
      "category varchar(64))"
  );
  console.log("Training table added");

  response = await connection.query(
    "CREATE TABLE `coach` (" +
      "id int AUTO_INCREMENT PRIMARY KEY," +
      "name varchar(64))"
  );

  console.log("Coach table added");

  response = await connection.query(
    "CREATE TABLE `lesson` (" +
      "id int AUTO_INCREMENT PRIMARY KEY," +
      "title varchar(64) NOT NULL," +
      "startTime datetime NOT NULL," +
      "endTime datetime NOT NULL," +
      "vacancy int NOT NULL DEFAULT 0," +
      "maxVacancy int NOT NULL," +
      "professorName varchar(64) NOT NULL)"
  );

  console.log("Lesson table added");

  response = await connection.query(
    "CREATE TABLE `lessoncheckin` (" +
      "id int AUTO_INCREMENT PRIMARY KEY," +
      "userid int NOT NULL," +
      "lessonid int NOT NULL)"
  );

  connection.end();
}

async function CreateDataBase() {
  await CreateDB();
  await CreateTables();
  console.log("Migration Run Sucessfuly");
}

CreateDataBase();
