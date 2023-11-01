const connection = require("../../database")

async function acceptSolicitaction(req, res) {
  const { body } = req.body;

  await connection.query("UPDATE `user` SET registerStatus = ? WHERE id= ?", [
    body.statusvalue,
    body.userid,
  ]);

  res.status(200).end();
}

async function logIn(req, res, next) {
  const { body } = req.body;

  const [queryResult] = await connection.query(
    "SELECT email, password FROM `manager` WHERE email= ? LIMIT 1",
    [body.email]
  );
  
  if(!queryResult[0]) { 
    res.status(404).end()
  }
  if(queryResult[0].password == body.password) { 
    next(); 
  } else { 
    res.status(400).json({message: "email or password incorrect"})
  }
}

async function checkSolicitations(req, res) {
  const [queryResult] = await connection.query(
    "SELECT * FROM `user` WHERE registerStatus = 'waiting'"
  );

  res.status(200).json(queryResult);
}

module.exports = {
  acceptSolicitaction,
  checkSolicitations,
  logIn
};
