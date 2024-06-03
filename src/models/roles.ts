import { Schema, model, Types } from "mongoose";

interface IRole {
  vaitro: string;
  trangthai: number;
}

const roleSchema = new Schema<IRole>({
  vaitro: { type: String },
  trangthai: { type: Number },
});

const Role = model<IRole>("roles", roleSchema);

export default Role;
