
import mongoose, { Schema } from "mongoose";
import { ICategory } from "../../../../entitties/interfaces/course/ICategory";

const CategorySchema : Schema  = new Schema<ICategory>({
    name: {type:String, required:true},
    description:{type:String, required:true},
    isBlocked:{type:Boolean, default:false},
})

export const CategoryModal = mongoose.model("Category", CategorySchema)