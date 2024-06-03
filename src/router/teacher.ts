import Router from "express";
import authenController from "../controllers/authen_controller";
import teacherController from "../controllers/teacher_controller";
import { checkTeacherMiddleware } from "../middleware/checkTeacher";

const router = Router();

router.post("/login", teacherController.login);
router.post("/logout", authenController.logout);
router.get(
  "/tkb/:teacherId",
  checkTeacherMiddleware,
  teacherController.getTimetableById
);
router.get(
  "/:id/classes",
  checkTeacherMiddleware,
  teacherController.getDistinctClassesByTeacherId
);
router.get(
  "/subject/:idTeacher",
  checkTeacherMiddleware,
  teacherController.getTeacherSubject
);
router.get(
  "/classes/:idLop/students",
  checkTeacherMiddleware,
  teacherController.getStudentByIdLop
);
router.get(
  "/getAllScore",
  checkTeacherMiddleware,
  teacherController.getAllScoreOfStudent
);
router.post(
  "/scores/update",
  checkTeacherMiddleware,
  teacherController.updateScoreToStudent
);

export default router;
