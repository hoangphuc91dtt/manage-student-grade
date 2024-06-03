import { Schema, model } from "mongoose";

// Define Score interface
interface ISubject extends Document {
  ten: string;
}

// Define Score schema
const scoreSchema = new Schema<ISubject>({
  ten: { type: String },
});

// Create Score model
const Subject = model<ISubject>("subjects", scoreSchema);

export default Subject;
