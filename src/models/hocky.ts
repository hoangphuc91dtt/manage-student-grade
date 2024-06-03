import { Schema, model } from "mongoose";

interface IHocKy {
  ten: string;
  dateStart: Date;
  dateEnd: Date;
}

const hocKySchema = new Schema<IHocKy>({
  ten: { type: String },
  dateStart: { type: Date },
  dateEnd: { type: Date },
});

const HocKy = model<IHocKy>("hockys", hocKySchema);

export default HocKy;
