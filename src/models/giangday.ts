import { Schema, Types, model } from "mongoose";

interface IGiangDay {
  idUser: Types.ObjectId;
  idMH: Types.ObjectId;
}

const giangDaySchema = new Schema<IGiangDay>({
  idUser: { type: Schema.Types.ObjectId },
  idMH: { type: Schema.Types.ObjectId },
});

const GiangDay = model<IGiangDay>("giangdays", giangDaySchema);

export default GiangDay;
