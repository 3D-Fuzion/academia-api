const connection = require("../database")

const createPublication = async (request, response) => {
  const { body } = request;

  await connection.query(
    "INSERT INTO `post` (userid, image, likes) VALUES (?, ?, ?) ",
    [body.userid, body.image, 0]
  );
  return response.status(201).end() 
};


module.exports = {
  createPublication,
};
