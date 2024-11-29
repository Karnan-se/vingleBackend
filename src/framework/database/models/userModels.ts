import mongoose, {Schema, Types} from "mongoose";
import { Iuser } from "../../../entitties/interfaces/user/user";



const useSchema: Schema = new Schema({
    _id: { type: Types.ObjectId, default: () => new Types.ObjectId() },
    emailAddress:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    country:{type:String, required:true}, 
    photo:{type:String, required:false},
    isBlocked:{type:String, required:false, default:false}
    // socialmedia:{
    //     linkedIN:{type:String},
    //     twitter:{type:String},
    // },

})

export const userModel = mongoose.model("User", useSchema)


