import { Schema, Types, model } from "mongoose";

interface IUser {
  holot: string;
  ten: string;
  gioitinh: number;
  ngaysinh: Date;
  dienthoai: number;
  email: string;
  diachi: string;
  password: string;
  token: string;
  roleId: Types.ObjectId;
}

const userSchema = new Schema<IUser>({
  holot: { type: String },
  ten: { type: String },
  gioitinh: { type: Number },
  ngaysinh: { type: Date },
  dienthoai: { type: Number },
  email: { type: String, required: true },
  diachi: { type: String },
  password: { type: String, required: true },
  token: { type: String },
  roleId: { type: Schema.Types.ObjectId },
});

const User = model<IUser>("users", userSchema);

export default User;
