import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://hoangphuc91dtt:phuchoang112233@cluster0.y5elmgl.mongodb.net/qldthpt"
    );
    console.log("DB connected !!");
  } catch (error) {
    console.log("DB connect fail !!");
  }
}
