import { Schema, model } from "mongoose";

interface IClass {
  ten: string;
}

const classSchema = new Schema<IClass>({
  ten: { type: String },
});

const Class = model<IClass>("classes", classSchema);

export default Class;
