const express = require("express");
const router = express.Router();
const loginController = require("./controllers/LoginController");
const managerController = require("./controllers/ManagerController");
const loginMiddleware = require("./controllers/middlewares/LoginMiddleware");
const recordController = require("./controllers/RecordController");
const profileController = require("./controllers/ProfileController");
const profileMiddleware = require("./controllers/middlewares/ProfileMiddleware");
const lessonMiddleware = require("./controllers/middlewares/LessonMiddleware");
const lessonController = require("./controllers/LessonController");
const coachController = require("./controllers/CoachController");
const trainingController = require("./controllers/TrainingController");
const postMiddleware = require("./controllers/middlewares/PostMiddleware");
const postController = require("./controllers/PostController");

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

router.get("/training", recordController.getTrainings);

router.put("/training", recordController.setRecord);

router.get("/manager/solicitation", managerController.checkSolicitations);

router.put("/manager/solicitation", managerController.acceptSolicitaction);

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
);

router.patch(
  "/lesson/checkin",
  lessonMiddleware.validadeCheckInLessonBody,
  lessonController.checkIn
);

router.get("/lesson", lessonController.getLesson);
router.get(
  "/lesson/:id",
  lessonMiddleware.validadeGetLessonById,
  lessonController.getLessonById
);

router.get(
  "/lesson/:id/student",
  lessonMiddleware.validadeGetStudentsInLesson,
  lessonController.getStudentInLesson
);

router.delete("/lesson/checkin", lessonController.cancelCheckIn);

router.post(
  "/manager/login",
  managerController.logIn,
  loginController.generateToken
);

router.get("/coach", coachController.getCoach);

router.get("/training/categories", trainingController.getCategories);

router.post("/post", postMiddleware.validadeMakePost,  postController.createPublication);

module.exports = router;
