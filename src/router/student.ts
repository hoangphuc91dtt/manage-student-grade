import { Router } from "express";
import authenController from "../controllers/authen_controller";
import studentController from "../controllers/student_controller";
import { checkStudentMiddleware } from "../middleware/checkStudent";

const router = Router();

router.post("/login", studentController.login);
router.post("/logout", authenController.logout);
router.get(
  "/:id/showInfo",
  checkStudentMiddleware,
  studentController.showInfoToQueryTimetable
);
router.get(
  "/tkb",
  checkStudentMiddleware,
  studentController.showTimetableOfStudent
);
router.get(
  "/:id/scores",
  checkStudentMiddleware,
  studentController.getScoreByStudentId
);

export default router;
