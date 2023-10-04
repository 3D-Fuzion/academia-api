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

const validadeSexBody = async (req, res, next) => { 
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

  if(!body.sex) { 
    return res.status(400).json({message: "SEX is required!"});
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

const validadeEffectPhraseBody = async (req, res, next) => { 
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

  if(!body.effectphrase) { 
    return res.status(400).json({message: "EFFECTPHRASE is required!"});
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

const validadeNameBody = async (req, res, next) => { 
  let connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    connectionLimit: 1,
  });

  const body = req.body;
  const regex = /[0-9]/; 

  if(!body.userid) { 
    return res.status(400).json({message: "USERID is required!"});
  } 

  if(!body.name) { 
    return res.status(400).json({message: "NAME is required!"});
  } else if (regex.test(body.name)) { 
    return res.status(400).json({message: "NAME must be only letters!"});
  }

  const query = "SELECT * from `user` WHERE id = ? LIMIT 1"

  const [rows] = await connection.execute(query,[ 
    body.userid
  ]);

  if(rows.length < 1) { 
    return res.status(404).json({message: "User not found"});
  }

  next(); 
}

module.exports = {
    validadeSetImageBody,
    validadeSexBody,
    validadeEffectPhraseBody,
    validadeNameBody,
}