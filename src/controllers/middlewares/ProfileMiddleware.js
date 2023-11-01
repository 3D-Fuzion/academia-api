const connection = require("../../database")

const validadeSetImageBody = async (req, res, next) => {
  const { body } = req;

  if (!body.userid) {
    res.status(400).json({ message: "USERID is required!" });
  }

  if (!body.image) {
    res.status(400).json({ message: "EFFECT_PHRASE is required!" });
  }

  const query = "SELECT * from `user` WHERE id = ? LIMIT 1"

  const [rows] = await connection.execute(query, [
    body.userid
  ]);

  if (rows.length < 1) {
    res.status(404).json({ message: "User not found" });
  }

  connection.end();
  next();
}

const validadeSexBody = async (req, res, next) => {
  const { body } = req;

  if (!body.userid) {
    res.status(400).json({ message: "USERID is required!" });
  }

  if (!body.sex) {
    res.status(400).json({ message: "SEX is required!" });
  }

  const query = "SELECT * from `user` WHERE id = ? LIMIT 1"

  const [rows] = await connection.execute(query, [
    body.userid
  ]);

  if (rows.length < 1) {
    res.status(404).json({ message: "User not found" });
  }

  connection.end();
  next();
}

const validadeEffectPhraseBody = async (req, res, next) => {
  const { body } = req;

  if (!body.userid) {
    res.status(400).json({ message: "USERID is required!" });
  }

  if (!body.effectphrase) {
    res.status(400).json({ message: "EFFECTPHRASE is required!" });
  }

  const query = "SELECT * from `user` WHERE id = ? LIMIT 1"

  const [rows] = await connection.execute(query, [
    body.userid
  ]);

  if (rows.length < 1) {
    res.status(404).json({ message: "User not found" });
  }

  next();
}

const validadeNameBody = async (req, res, next) => {
  const { body } = req;

  const regex = /[0-9]/;

  if (!body.userid) {
    res.status(400).json({ message: "USERID is required!" });
  }

  if (!body.name) {
    res.status(400).json({ message: "NAME is required!" });
  } else if (regex.test(body.name)) {
    res.status(400).json({ message: "NAME must be only letters!" });
  }

  const query = "SELECT * from `user` WHERE id = ? LIMIT 1"

  const [rows] = await connection.execute(query, [
    body.userid
  ]);

  if (rows.length < 1) {
    res.status(404).json({ message: "User not found" });
  }

  next();
}

const validadeBirthDateBody = async (req, res, next) => {
  const body = req.body;
  const regex = new RegExp("[0-9][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]");

  if (!body.userid) {
    res.status(400).json({ message: "USERID is required!" });
  }

  if (!body.birthdate) {
    res.status(400).json({ message: "BIRTH_DATE is required!" });
  } else if (!regex.test(body.birthdate)) {
    res.status(400).json({ message: "BIRTH_DATE format is incorrect!" });
  }

  const query = "SELECT * from `user` WHERE id = ? LIMIT 1"

  const [rows] = await connection.execute(query, [
    body.userid
  ]);

  if (rows.length < 1) {
    res.status(404).json({ message: "User not found" });
  }

  next();
}

module.exports = {
  validadeSetImageBody,
  validadeSexBody,
  validadeEffectPhraseBody,
  validadeNameBody,
  validadeBirthDateBody,
}