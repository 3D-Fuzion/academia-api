const express = require("express");
const router = express.Router();
const loginController = require("./controllers/LoginController");
const managerController = require("./controllers/ManagerController");
const loginMiddleware = require("./controllers/middlewares/LoginMiddleware");
const serverStatusController = require("./controllers/ServerStatusController");

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
router.patch(
  "/login/changepwd",
  loginMiddleware.validadeChangePwdBody,
  loginController.changePassword
);
router.put("/manager/solicitation", managerController.acceptSolicitaction);
router.get("/manager/solicitation", managerController.checkSolicitations);
router.get("", serverStatusController.serverStatus);

module.exports = router;
