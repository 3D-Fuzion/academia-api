const { json } = require("express");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");
const axios = require('axios'); 
const FormData = require('form-data');

require("dotenv").config();

const changeSex = async (request, response) => {
  let connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    connectionLimit: 1,
  });

  const query =
    "UPDATE `user` SET sex = ? WHERE id = ? LIMIT 1";

  const body = request.body;

  const [rows] = await connection.execute(query, [
    body.sex,
    body.userid
  ]);
  
  connection.end();

  if(rows.affectedRows > 0) { 
  	return response.status(200).end();
  }
  
  return response.status(500).json({message:"Server Error!"});
};

const changeEffectPhrase = async (request, response) => {
  let connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    connectionLimit: 1,
  });

  const query =
    "UPDATE `user` SET effectPhrase = ? WHERE id = ? LIMIT 1";

  const body = request.body;

  const [rows] = await connection.execute(query, [
    body.effectphrase,
    body.userid
  ]);

  connection.end();

  if(rows.affectedRows > 0) { 
  	return response.status(200).end();
  }

  return response.status(500).json({message: "Server Error!"});
};

const setImage = async (request, response) => {
  let connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    connectionLimit: 1,
  });

  const body = request.body;

  if(!body.userid) { 
  	response.status(400).json({message: "USERID is required!"});
  }

  if(!body.image) { 
  	response.status(400).json({message: "IMAGE is required!"});
  }

  const form = new FormData();
  form.append('image', body.image);

  const res = await axios.post(
  'https://api.imgbb.com/1/upload',
  form,
  {
    params: {
      'key': process.env.IMG_BB
    },
    headers: {
      ...form.getHeaders()
    }
  }
  );

  if(res.status != 200) { 
  	response.status(500).json({message: "IMAGE API Error!"}).end();
  }

  const query =
    "UPDATE `user` SET imageUrl = ? WHERE id = ? LIMIT 1";

  const [rows] = await connection.execute(query, [
    res.data.data.display_url,
    body.userid
  ]);

  connection.end();

  if(rows.affectedRows === 0) { 
  	response.status(500).json({message: "Server Error!"}).end();
  }
  
  response.status(200).json({imageUrl: res.data.data.display_url}).end();
};

const changeName = async (request, response) => { 
  let connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    connectionLimit: 1,
  });

  const body = request.body;

  const query =
    "UPDATE `user` SET name = ? WHERE id = ? LIMIT 1";

  const [rows] = await connection.execute(query, [
    body.name,
    body.userid
  ]);

  connection.end();

  if(rows.affectedRows === 0) { 
    return response.status(500).json({message: "Server Error!"}).end();
  }
  
  return response.status(200).end();
}

const changeBirthDate = async (request, response) => { 
  let connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    connectionLimit: 1,
  });

  const body = request.body;

  const query =
    "UPDATE `user` SET birthdate = ? WHERE id = ? LIMIT 1";

  const [rows] = await connection.execute(query, [
    body.birthdate,
    body.userid
  ]);

  connection.end();

  if(rows.affectedRows === 0) { 
    return response.status(500).json({message: "Server Error!"}).end();
  }
  
  return response.status(200).end();
}

module.exports = {
  changeSex,
  changeEffectPhrase,
  setImage,
  changeName,
  changeBirthDate,
};
