import { Request, Response } from "express";
import User from "../models/user";
import Role from "../models/roles";
import Timetable from "../models/timetables";
import Enrollment from "../models/enrollment";
import Score from "../models/score";
import GiangDay from "../models/giangday";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

class teacherController {
  async login(req: Request, res: Response) {
    try {
      let { email, password } = req.body;
      const user = await User.findOne({ email: email, password: password });
      const userId = user?._id;

      if (!user) {
        return res.status(404).json({ message: "Khong tim thay user" });
      }

      let role = await Role.find({ _id: user.roleId });
      if (role[0].vaitro === "teacher") {
        let token = await jwt.sign(
          { email, user_id: user._id, role_id: user.roleId },
          "authen1"
        );

        user.token = token;
        user.save();

        res.status(200).json({ token: token, userId: userId });
        return;
      }

      res.status(403).json({ message: "Ko đúng vai trò" });
    } catch (err) {
      res.status(500).json({ message: "Err" });
    }
  }
  async getTimetableById(req: Request, res: Response) {
    const teacherId = req.params.teacherId;

    try {
      const timeTables = await Timetable.aggregate([
        { $match: { idGV: new Types.ObjectId(teacherId), trangthai: 1 } },
        {
          $lookup: {
            from: "classes",
            localField: "lopId",
            foreignField: "_id",
            as: "classData",
          },
        },
        {
          $project: {
            _id: 0,
            thu: 1,
            tietbatdau: 1,
            tietketthuc: 1,
            lop: { $arrayElemAt: ["$classData.ten", 0] },
          },
        },
      ]);
      res.status(200).json(timeTables);
    } catch (error) {
      res.status(500).json({ message: "Err" });
    }
  }

  async getDistinctClassesByTeacherId(req: Request, res: Response) {
    try {
      const teacherId = req.params.id;

      const classes = await Timetable.aggregate([
        {
          $match: { idGV: new Types.ObjectId(teacherId), trangthai: 1 },
        },
        {
          $group: {
            _id: "$lopId",
          },
        },
        {
          $lookup: {
            from: "classes",
            localField: "_id",
            foreignField: "_id",
            as: "classesData",
          },
        },
        {
          $project: {
            _id: 1,
            lop: { $arrayElemAt: ["$classesData.ten", 0] },
          },
        },
      ]);

      res.status(200).json(classes);
    } catch (error) {
      res.status(500).json({ message: "Error" });
    }
  }
  async getStudentByIdLop(req: Request, res: Response) {
    const lopId = req.params.idLop;

    try {
      const students = await Enrollment.aggregate([
        {
          $match: { idLop: new Types.ObjectId(lopId), trangthai: 1 },
        },
        {
          $lookup: {
            from: "namhocs",
            localField: "idNH",
            foreignField: "_id",
            as: "namhocData",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "idUser",
            foreignField: "_id",
            as: "userData",
          },
        },

        {
          $project: {
            _id: 0,
            idUser: 1,
            holot: { $arrayElemAt: ["$userData.holot", 0] },
            ten: { $arrayElemAt: ["$userData.ten", 0] },
            idHK: 1,
            idNH: 1,
          },
        },
      ]);

      res.status(200).json(students);
    } catch (err) {
      res.status(500).json({ message: "Err" });
    }
  }

  async getTeacherSubject(req: Request, res: Response) {
    const idTeacher = req.params.idTeacher;

    const subject = await GiangDay.aggregate([
      {
        $match: { idUser: new Types.ObjectId(idTeacher) },
      },
      {
        $lookup: {
          from: "subjects",
          localField: "idMH",
          foreignField: "_id",
          as: "monhocData",
        },
      },
      {
        $project: {
          _id: 0,
          idMH: 1,
          ten: { $arrayElemAt: ["$monhocData.ten", 0] },
        },
      },
    ]);

    res.status(200).json(subject);
    try {
    } catch (err) {
      res.status(500).json({ message: "err" });
    }
  }

  async updateScoreToStudent(req: Request, res: Response) {
    try {
      const { idUser, idHK, idNH, diem, loaidiem, idMH } = req.body;

      const scoreStudent = await Score.findOne({
        idUser: idUser,
        idHK: idHK,
        idNH: idNH,
        loaidiem: loaidiem,
        idMH: idMH,
      });

      if (scoreStudent) {
        // Điểm đã tồn tại, cập nhật giá trị điểm mới
        scoreStudent.diem = diem;
        await scoreStudent.save();
        res.status(200).json({ message: "successfully updated" });
      } else {
        //create
        const newScore = new Score({
          idUser: idUser,
          idHK: idHK,
          idNH: idNH,
          diem: diem,
          loaidiem: loaidiem,
        });

        // Lưu điểm mới
        await newScore.save();

        res.status(200).json({ message: "create new grades successfully" });
      }

      // Điểm đã được cập nhật thành công
    } catch (err) {
      res.status(500).json({ message: "Err" });
    }
  }

  async getAllScoreOfStudent(req: Request, res: Response) {
    const idStudent = req.query.idUser?.toString();
    const idNH = req.query.idNH?.toString();
    const idHK = req.query.idHK?.toString();
    const idMH = req.query.idMH?.toString();

    try {
      const scores = await Score.aggregate([
        {
          $match: {
            idUser: new Types.ObjectId(idStudent),
            idNH: new Types.ObjectId(idNH),
            idHK: new Types.ObjectId(idHK),
            idMH: new Types.ObjectId(idMH),
          },
        },
        {
          $project: {
            _id: 0,
            diem: 1,
            loaidiem: 1,
          },
        },
      ]);

      res.status(200).json(scores);
    } catch (error) {
      res.status(500).json({ message: "Err" });
    }
  }
}

export default new teacherController();
