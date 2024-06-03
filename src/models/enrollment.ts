import { Schema, model, Types } from "mongoose";

interface IEnrollment {
  idLop: Types.ObjectId;
  idUser: Types.ObjectId;
  idNH: Types.ObjectId;
  idHK: Types.ObjectId;
  ngaysua: Date;
  trangthai: number;
}

const enrollmentSchema = new Schema<IEnrollment>({
  idLop: { type: Schema.Types.ObjectId },
  idUser: { type: Schema.Types.ObjectId },
  idNH: { type: Schema.Types.ObjectId },
  idHK: { type: Schema.Types.ObjectId },
  ngaysua: { type: Date, default: Date.now },
  trangthai: { type: Number },
});

const Enrollment = model<IEnrollment>("enrollments", enrollmentSchema);

export default Enrollment;
