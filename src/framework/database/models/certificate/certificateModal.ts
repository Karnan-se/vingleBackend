
import { Schema } from "mongoose";
import mongoose from "mongoose";
import { ICertificate } from "../../../../entitties/interfaces/certificate/ICertificate";


const certificateSchema = new Schema<ICertificate>({
    courseId :{type: mongoose.Types.ObjectId, ref: "Course"},
    tutorId:{type:mongoose.Types.ObjectId, ref:"Tutor" },
    userId:{type:mongoose.Types.ObjectId , ref:"User"},
    certificateUrl:{type:String}
},{timestamps:true})

export const certificateModal = mongoose.model<ICertificate>("certificate", certificateSchema)