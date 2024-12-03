import { Schema, Types } from "mongoose";
import mongoose from "mongoose";

const adminSchema: Schema =  new Schema({
    _id: {type:String, default:()=> new Types.ObjectId() },
    emailAddress: {type:String, required:true, unique:true},
    password:{type:String, required:true},
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    country:{type:String, required:true}, 
    photo:{type:String, required:false},
    createdAt:{type:Date, default : Date.now }
})

export const AdminModel = mongoose.model("Admin", adminSchema)