const mysql = require("mysql2/promise");
require("dotenv").config();

const validateCreateLessonBody = async (req, res, next) => {
  const { body } = req;

  if (!body.professorname) {
    res.status(400).json({ message: "professorname is required" });
  }

  if (!body.title) {
    res.status(400).json({ message: "title is required" });
  }

  if (!body.starttime) {
    res.status(400).json({ message: "starttime is required" });
  }

  if (!body.endtime) {
    res.status(400).json({ message: "endtime is required" });
  }

  if (!body.maxvacancy) {
    res.status(400).json({ message: "maxvacancy is required" });
  }

  next();
};

const validadeCheckInLessonBody = async (req, res, next) => {
  const body = req.body;

  if (!body.lessonid) {
    res.status(400).json({ message: "lessonid is required" });
  }

  if (!body.id) {
    res.status(400).json({ message: "id is required" });
  }

  const [user] = await connection.execute(
    "SELECT * FROM `user` WHERE id = ? LIMIT 1",
    [body.id]
  );

  const [lesson] = await connection.execute(
    "SELECT * FROM `lesson` WHERE id = ? LIMIT 1",
    [body.lessonid]
  );

  if (!user.length > 0) {
    res.status(404).json({ message: "user not founded" });
  }

  if (!lesson.length > 0) {
    res.status(404).json({ message: "lesson not founded" });
  }

  next();
};

const validadeGetStudentsInLesson = async (req, res, next) => {
  let connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    connectionLimit: 1,
  });

  const params = req.params;

  if (!params.id) {
    res.status(400).json({ message: "id is required" });
  }

  next();
};

const validadeGetLessonById = async (req, res, next) => {
  const params = req.params;

  if (!params.id) {
    res.status(400).json({ message: "id is required" });
  }

  next();
};

module.exports = {
  validateCreateLessonBody,
  validadeCheckInLessonBody,
  validadeGetStudentsInLesson,
  validadeGetLessonById,
};
