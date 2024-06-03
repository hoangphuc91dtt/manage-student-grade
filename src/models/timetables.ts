import { Schema, model, Types } from "mongoose";

interface ITimetable {
  lopId: Types.ObjectId;
  monhocId: Types.ObjectId;
  namhocId: Types.ObjectId;
  hockyId: Types.ObjectId;
  tietbatdau: number;
  tietketthuc: number;
  thu: number;
  idGV: Types.ObjectId;
  trangthai: number;
}

const timetableSchema = new Schema<ITimetable>({
  lopId: { type: Schema.Types.ObjectId },
  monhocId: { type: Schema.Types.ObjectId },
  namhocId: { type: Schema.Types.ObjectId },
  hockyId: { type: Schema.Types.ObjectId },
  tietbatdau: { type: Number },
  tietketthuc: { type: Number },
  thu: { type: Number },
  idGV: { type: Schema.Types.ObjectId },
  trangthai: { type: Number },
});

const Timetable = model<ITimetable>("timetables", timetableSchema);

export default Timetable;
