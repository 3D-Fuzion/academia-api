const express = require("express");
const router = require("./router");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(router);

module.exports = app;
