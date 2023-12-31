const connection = require("../database")
require("dotenv").config();

const createLesson = async (req, res) => {
  const body = req.body;

  const [newlesson] = await connection.execute(
    "INSERT INTO `lesson` (title, professorName, startTime, endTime, maxVacancy, vacancy) VALUES (?,?,?,?,?,?)",
    [
      body.title,
      body.professorname,
      body.starttime,
      body.endtime,
      body.maxvacancy,
      0,
    ]
  );

  if (newlesson.affectedRows > 0) {
    res.status(201).end();
  } else {
    res.status(500).end();
  }
};

const checkIn = async (req, res) => {
  const body = req.body;

  const [lesson] = await connection.execute(
    "SELECT * FROM `lesson` WHERE id = ? LIMIT 1",
    [body.lessonid]
  );

  if (lesson[0].vacancy < lesson[0].maxVacancy) {
    const newVacancy = lesson[0].vacancy + 1;

    const [checkinsituation] = await connection.query(
      "SELECT * FROM `lessoncheckin` WHERE userid = ? AND lessonid = ? ",
      [body.id, body.lessonid]
    );

    if (checkinsituation.length > 0) {
      return res
        .status(409)
        .json({ message: "user is already checkedin" })
        .end();
    }

    const [checkIn] = await connection.query(
      "UPDATE `lesson` SET vacancy = ? WHERE id = ? LIMIT 1",
      [newVacancy, body.lessonid]
    );

    if (checkIn.affectedRows > 0) {
      await connection.query(
        "INSERT INTO `lessoncheckin` (userid, lessonid) VALUES (?, ?)",
        [body.id, body.lessonid]
      );
      res.status(200).end();
    }
  } else {
    res.status(409).json({ message: "lesson is full" }).end();
  }
};

const cancelCheckIn = async (req, res) => {
  const body = req.body;

  const [lesson] = await connection.query("SELECT * FROM `lesson` LIMIT 1");

  const newVacancy = lesson[0].vacancy - 1;

  await connection.query("UPDATE `lesson` SET vacancy = ? WHERE id = ?", [
    newVacancy,
    body.lessonid,
  ]);

  await connection.query(
    "DELETE FROM `lessoncheckin` WHERE userid = ? AND lessonid = ? LIMIT 1",
    [body.id, body.lessonid]
  );
  
  res.status(200).end();
};

const getLesson = async (req, res) => {
  const params = req.query;

  var lesson;
  if (!params.date) {
    [lesson] = await connection.query("SELECT * FROM `lesson`");
  } else {
    [lesson] = await connection.query(
      "SELECT * FROM `lesson` WHERE startTime LIKE ?",
      [params.date + "%"]
    );
  }

  res.status(200).json(lesson);
};

const getLessonById = async (req, res) => {
  const params = req.params;

  const [lesson] = await connection.query(
    "SELECT * FROM `lesson` WHERE id = ?",
    [params.id]
  );

  if (lesson.length != 0) {
    res.status(200).json(lesson);
  } else {
    res.status(404).end();
  }
};

const getStudentInLesson = async (req, res) => {
  const params = req.params;

  const [user] = await connection.query(
    "SELECT name,id FROM user " +
    "WHERE user.id IN" +
    "(SELECT userid FROM lessoncheckin WHERE lessoncheckin.lessonid = ?)",
    [params.id]
  );

  if (user.length < 1) {
    res.status(404).end();
  } else {
    res.json(user);
  }
};

module.exports = {
  createLesson,
  checkIn,
  cancelCheckIn,
  getLesson,
  getStudentInLesson,
  getLessonById,
};
