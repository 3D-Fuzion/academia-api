const express = require("express");
const router = express.Router();
const loginController = require("../controllers/LoginController");
const loginMiddleware = require("../controllers/middlewares/LoginMiddleware");

router.post(
  "/user",
  loginMiddleware.validadeCreateUserBody,
  loginController.createUser
);
router.post(
  "/login",
  loginMiddleware.validadeCredentialsBody,
  loginController.generateToken
);

module.exports = router;
