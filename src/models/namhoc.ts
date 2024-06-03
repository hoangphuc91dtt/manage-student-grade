import { Schema, model } from "mongoose";

interface INamHoc {
  ten: string;
  dateStart: Date;
  dateEnd: Date;
}

const namHocSchema = new Schema<INamHoc>({
  ten: { type: String },
  dateStart: { type: Date },
  dateEnd: { type: Date },
});

const NamHoc = model<INamHoc>("namhocs", namHocSchema);

export default NamHoc;
