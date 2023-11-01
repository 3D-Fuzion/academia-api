const connection = require("../../database")

const getCategories = async (req, res) => {
  const [categories] = await connection.query(
    "SELECT category FROM `training` WHERE name IS NULL"
  );

  res.status(200).json(categories);
};
module.exports = {
  getCategories,
};
