import { Request, Response } from "express";
import Score from "../models/score";
import Role from "../models/roles";
import User from "../models/user";
import Enrollments from "../models/enrollment";
import HocKy from "../models/hocky";
import Timetable from "../models/timetables";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

class StudentController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email, password: password });

      if (!user) {
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
      }

      const role = await Role.findById(user.roleId);
      if (!role || role.vaitro !== "student") {
        return res
          .status(403)
          .json({ message: "Không đúng vai trò sinh viên" });
      }

      const token = jwt.sign(
        { email, user_id: user._id, role_id: user.roleId },
        "authen1"
      );

      user.token = token;
      await user.save();

      res.status(200).json({ token: token, userId: user._id });
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ máy chủ" });
    }
  }

  async showInfoToQueryTimetable(req: Request, res: Response) {
    const idUser = req.params.id;

    try {
      let enrollmentCurrent = await Enrollments.aggregate([
        { $match: { idUser: new Types.ObjectId(idUser), trangthai: 1 } },
      ]);

      let hocky = await HocKy.find();
      let idHocky1, idHocky2;
      hocky.forEach((item) => {
        if (item.ten === "hocky1") {
          idHocky1 = item._id;
        }
        if (item.ten === "hocky2") {
          idHocky2 = item._id;
        }
      });

      res.status(200).json({
        idLopCurent: enrollmentCurrent[0].idLop,
        idNamHocCurrent: enrollmentCurrent[0].idNH,
        idHK1: idHocky1,
        idHK2: idHocky2,
      });
    } catch (error) {
      res.status(500).json({ message: "Error" });
    }
  }
  async getScoreByStudentId(req: Request, res: Response) {
    const studentId = req.params.id;

    try {
      const scores = await Score.aggregate([
        { $match: { idUser: new Types.ObjectId(studentId) } },
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
            from: "hockys",
            localField: "idHK",
            foreignField: "_id",
            as: "hockyData",
          },
        },
        {
          $lookup: {
            from: "subjects",
            localField: "idMH",
            foreignField: "_id",
            as: "subejctData",
          },
        },
        {
          $lookup: {
            from: "classes",
            localField: "idLop",
            foreignField: "_id",
            as: "classesData",
          },
        },
        {
          $project: {
            _id: 0,
            namhoc: { $arrayElemAt: ["$namhocData.ten", 0] },
            monhoc: { $arrayElemAt: ["$subejctData.ten", 0] },
            hocky: { $arrayElemAt: ["$hockyData.ten", 0] },
            idLop: { $arrayElemAt: ["$classesData._id", 0] },
            loaidiem: 1,
            diem: 1,
          },
        },
      ]);

      res.status(200).json(scores);
    } catch (error) {
      res.status(500).json({ message: "Error" });
    }
  }
  async showTimetableOfStudent(req: Request, res: Response) {
    try {
      const idLop = req.query.idlop?.toString();
      const idNH = req.query.idNH?.toString();

      if (idLop && idNH) {
        const responseData = await Timetable.aggregate([
          {
            $match: {
              lopId: new Types.ObjectId(idLop),
              namhocId: new Types.ObjectId(idNH),
              trangthai: 1,
            },
          },
          {
            $lookup: {
              from: "subjects",
              localField: "monhocId",
              foreignField: "_id",
              as: "subjectData",
            },
          },
          {
            $project: {
              _id: 0,
              monhoc: { $arrayElemAt: ["$subjectData.ten", 0] },
              tietbatdau: 1,
              tietketthuc: 1,
              thu: 1,
            },
          },
        ]);

        res.status(200).json(responseData);
      } else {
        res.status(400).json({ message: "Bad Request" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error" });
    }
  }
}

export default new StudentController();
