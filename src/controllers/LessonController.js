const { json } = require("express");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");
require("dotenv").config();

const createLesson = async (req, res) => {
  let connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    connectionLimit: 1,
  });

  const body = req.body;

  const [newlesson] = await connection.query("INSERT INTO `lesson` (title, professorName, startTime, endTime, maxVacancy, vacancy) VALUES (?,?,?,?,?,?)", [
    body.title,
    body.professorname,
    body.starttime,
    body.endtime,
    body.maxvacancy,
    0
  ]);

  if (newlesson.affectedRows > 0) {
    res.status(201).end();
  }

};

module.exports = { 
  createLesson,
}
