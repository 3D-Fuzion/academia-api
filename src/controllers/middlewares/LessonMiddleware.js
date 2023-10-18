const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateCreateLessonBody = async (req, res, next) => {
  const { body } = req;

  if (!body.professorname) {
    return res.status(400).json({ message: "professorname is required" });
  }

  if (!body.title) {
    return res.status(400).json({ message: "title is required" });
  }

  if (!body.starttime) {
    return res.status(400).json({ message: "starttime is required" });
  }

  if (!body.endtime) {
    return res.status(400).json({ message: "endtime is required" });
  }

  if (!body.maxvacancy) {
    return res.status(400).json({ message: "maxvacancy is required" });
  }

  next();
};

const validadeCheckInLessonBody = async (req, res, next) => {
  let connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    connectionLimit: 1,
  });

  const body = req.body;

  if (!body.lessonid) {
    return res.status(400).json({ message: "lessonid is required" });
  }

  if (!body.id) {
    return res.status(400).json({ message: "id is required" });
  }

  const [user] = await connection.query(
    "SELECT * FROM `user` WHERE id = ? LIMIT 1",
    [body.id]
  );

  const [lesson] = await connection.query(
    "SELECT * FROM `lesson` WHERE id = ? LIMIT 1",
    [body.lessonid]
  );

  if (!user.length > 0) {
    return res.status(404).json({ message: "user not founded" });
  }

  if (!lesson.length > 0) {
    return res.status(404).json({ message: "lesson not founded" });
  }

  next();
};
module.exports = {
  validateCreateLessonBody,
  validadeCheckInLessonBody,
};
