const express = require("express");
const router = express.Router();
const loginController = require("./controllers/LoginController");
const managerController = require("./controllers/ManagerController");
const loginMiddleware = require("./controllers/middlewares/LoginMiddleware");
const serverStatusController = require("./controllers/ServerStatusController");
const recordController = require("./controllers/RecordController")
const profileController = require("./controllers/ProfileController")
const profileMiddleware = require("./controllers/middlewares/ProfileMiddleware")
const lessonMiddleware = require("./controllers/middlewares/LessonMiddleware")
const lessonController = require("./controllers/LessonController")

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

router.post(
  "/profile/image",
  profileMiddleware.validadeSetImageBody,
  profileController.setImage
);

router.patch(
  "/profile/sex",
  profileMiddleware.validadeSexBody,
  profileController.changeSex
);

router.patch(
  "/profile/effectphrase",
  profileMiddleware.validadeEffectPhraseBody,
  profileController.changeEffectPhrase
);

router.patch(
  "/profile/name",
  profileMiddleware.validadeNameBody,
  profileController.changeName
);

router.patch(
  "/profile/birthdate",
  profileMiddleware.validadeBirthDateBody,
  profileController.changeBirthDate
);

router.post(
  "/lesson",
  lessonMiddleware.validateCreateLessonBody,
  lessonController.createLesson
)

router.patch(
  "/lesson/checkin",
  lessonController.checkIn
)

router.delete(
  "/lesson/checkin",
  lessonController.cancelCheckIn
)

module.exports = router;
