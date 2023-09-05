const express = require("express");
const router = express.Router();
const loginController = require("../controllers/LoginController");
const loginMiddleware = require("../controllers/middlewares/LoginMiddleware");

router.post("/user", loginMiddleware.validadeBody, loginController.createUser);

module.exports = router;
