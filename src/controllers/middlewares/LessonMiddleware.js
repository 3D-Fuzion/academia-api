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
}

module.exports = {
  validateCreateLessonBody,
}
