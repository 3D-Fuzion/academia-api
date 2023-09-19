const mysql = require("mysql2/promise");

const validadeSetImageBody = async (req, res, next) => { 
  let connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    connectionLimit: 1,
  });

  const body = req.body;

  if(!body.userid) { 
    return res.status(400).json({message: "USERID is required!"});
  }

  if(!body.image) { 
    return res.status(400).json({message: "EFFECT_PHRASE is required!"});
  }

  const query = "SELECT * from `user` WHERE id = ? LIMIT 1"

  const [rows] = await connection.execute(query,[ 
    body.userid
  ]);

  if(rows.length < 1) { 
    return res.status(404).json({message: "User not found"});
  }

  connection.end(); 
  next(); 
}

module.exports = {
    validadeSetImageBody,
}