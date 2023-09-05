const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");
const SECRET = "9817236498172346981237";

const createUser = async (request, response) => {
  const connection = mysql.createPool({
    host: "localhost",
    user: "academia-api",
    password: "6414",
    database: "academia-dev",
    port: "3306",
  });

  const body = request.body;

  const query = "INSERT INTO user(cpf,email,password) VALUES (?, ?, ?)";

  const [rows] = await connection.execute(query, [
    body.cpf,
    body.email,
    body.password,
  ]);

  console.log(rows.affectedRows);
  connection.end();
  return response.status(201).json();
};

const Authentication = async function (req, res) {
  const token = req.headers["x-acess-token"];
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).end();
    req.userId = decoded.userEmail;
    return res.status(200).end();
  });
};

const VerifyToken = async function (req, res, next) {
  const token = req.headers["x-acess-token"];
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).end();
    req.userId = decoded.userEmail;
    next();
  });
};

// export const VerifyApiStatus = async function (req, res) {
//   return res.status(200).end();
// };

module.exports = {
  createUser,
};
