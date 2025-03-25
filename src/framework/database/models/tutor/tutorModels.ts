import mongoose, { Schema } from "mongoose";
import { Types } from "mongoose";


const tutorSchema : Schema =  new Schema ({
    id: { type: Types.ObjectId, default: () => new Types.ObjectId() },
    emailAddress:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    country:{type:String, required:true}, 
    photo:{type:String, required:false},
    isBlocked:{type:Boolean, required:false, default:false},
    phoneNumber:{type:String},
    headline:{type:String},
     applicationDetails:{type:String,  ref: "Instructor" }  

},{timestamps:true})

export const Tutor = mongoose.model("Tutor", tutorSchema )