import mongoose from "mongoose";
import { IRevenue } from "../../../../entitties/interfaces/revenue/IRevenue";

 const RevenueSchema  = new mongoose.Schema({
    tutorId :{type:mongoose.Schema.Types.ObjectId , ref: "tutors"},
    adminId : {type:String},
    courseId:{type: mongoose.Schema.Types.ObjectId , ref : "courses"},
    tutorRevenue: { type: Number, required: true },
    adminRevenue: { type: Number, required: true },
}, {timestamps:true})

export const RevenueModal = mongoose.model<IRevenue>("Revenue", RevenueSchema)

