const express = require("express");
const router = express.Router();
const loginController = require("./controllers/LoginController");
const managerController = require("./controllers/ManagerController");
const loginMiddleware = require("./controllers/middlewares/LoginMiddleware");
const serverStatusController = require("./controllers/ServerStatusController");
const recordController = require("./controllers/RecordController")

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

router.get(
  "/training",
  recordController.getTrainings
); 

router.put(
  "/training",
  recordController.setRecord
); 

router.get(
  "", 
  serverStatusController.serverStatus
);

router.get(
  "/manager/solicitation", 
  managerController.checkSolicitations
);

router.put(
  "/manager/solicitation", 
  managerController.acceptSolicitaction
);

module.exports = router;
