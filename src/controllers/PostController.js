const connection = require("../database");

const createPublication = async (request, response) => {
  const { body } = request;

  await connection.query(
    "INSERT INTO `post` (userid, image, likes, title) VALUES (?, ?, ?, ?) ",
    [body.userid, body.image, 0, body.title]
  );
  return response.status(201).end() 
};

const deletePublication = async (request, response) => {
  const { body } = request;

  await connection.query(
    "DELETE FROM `post` WHERE id = ? ",
    [body.postid] 
  );

  return response.status(200).end() 
};

const getTenLastPost = async (request, response) => {
  const [posts] = await connection.query(
    "SELECT * FROM `post` ORDER BY ID DESC LIMIT 10 "
  );

  return response.json(posts)
};

const getPostById = async (request, response) => {
  const {params} = request
  
  const [post] = await connection.query(
    "SELECT * FROM `post` WHERE ID = ? ",
    [params.postid]
  );

  return response.json(post)
};


module.exports = {
  createPublication,
  deletePublication,
  getTenLastPost,
  getPostById
};
