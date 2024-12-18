import mongoose, { Schema, Types } from "mongoose";

const InstructorSchema: Schema = new Schema(
  {
    _id: { type: Types.ObjectId, default: () => new Types.ObjectId() },
    user_id: { type: Types.ObjectId, required: true }, 
    headline: { type: String, default: "" },
    skills: [{ type: String }], 
    degree: { type: String, default: "" },
    qualification: { type: String, default: "" },
    experience: { type: String, default: "" },
    resume: { type: String, default: "" }, 
    certifications: [
      {
        title: { type: String, required: true },
        issuer: { type: String, required: true },
        date: { type: Date, required: true },
        certificateUrl: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const InstructorModel = mongoose.model("Instructor", InstructorSchema);
