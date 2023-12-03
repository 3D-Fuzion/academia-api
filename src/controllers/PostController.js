const connection = require("../database")

const createPublication = async (request, response) => {
  const { body } = request;

  await connection.query(
    "INSERT INTO `post` (userid, image, likes, title) VALUES (?, ?, ?, ?) ",
    [body.userid, body.image, 0, body.title]
  );
  return response.status(201).end() 
};


module.exports = {
  createPublication,
};
