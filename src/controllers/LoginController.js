const jwt = require("jsonwebtoken");
const connection = require("../connection")
require("dotenv").config();

const generateToken = async (req, res) => {
  const { email } = req.body;

  const jwtToken = jwt.sign(
    { userEmail: email },
    process.env.JWT_TOKEN_SECRET,
    {
      expiresIn: 3600,
    }
  );

  res.status(200).json({
    token: jwtToken,
    id: res.locals.id,
    email: res.locals.email,
    cpf: res.locals.cpf,
  });
};

const createUser = async (request, response) => {
  const query =
    "INSERT INTO user(name, cpf, email, password, birthdate, academycode, registerstatus) VALUES (?, ?, ?, ?, ?, ?, ?)";

  const body = request.body;
  await connection.execute(query, [
    body.name,
    body.cpf,
    body.email,
    body.password,
    body.birthdate.substr(0, 10),
    body.academycode,
    "waiting",
  ]);

  response.status(201).end();
};

const changePassword = async (request, response) => {
  const body = request.body;
  const [rows] = await connection.query(
    "UPDATE `user` SET password = ? WHERE cpf = ? LIMIT 1",
    [body.newpassword, body.cpf]
  );

  console.log(rows.affectedRows);

  if (rows.affectedRows === 0) {
    response.status(500).json({ message: "internal server error" });
  }
  response.status(200).json();
};

module.exports = {
  createUser,
  generateToken,
  changePassword,
};
