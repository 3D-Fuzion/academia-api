const connection = require("../connection")
require("dotenv").config();

const getCoach = async (req, res) => {
  const [coach] = await connection.execute("SELECT * FROM `coach`");

  res.status(200).json(coach);
};

module.exports = {
  getCoach,
};
