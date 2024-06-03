import { Schema, model, Types } from "mongoose";

// Define Score interface
interface IScore extends Document {
  idUser: Types.ObjectId;
  idMH: Types.ObjectId;
  idNH: Types.ObjectId;
  idHK: Types.ObjectId;
  diem: number;
  loaidiem: Number;
}

// Define Score schema
const scoreSchema = new Schema<IScore>({
  idUser: { type: Schema.Types.ObjectId },
  idMH: { type: Schema.Types.ObjectId },
  idNH: { type: Schema.Types.ObjectId },
  idHK: { type: Schema.Types.ObjectId },
  diem: { type: Number },
  loaidiem: { type: Number },
});

// Create Score model
const Score = model<IScore>("scores", scoreSchema);

export default Score;
