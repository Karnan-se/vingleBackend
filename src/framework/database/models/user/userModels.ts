import mongoose, {Schema, Types} from "mongoose";
import { Iuser } from "../../../../entitties/interfaces/user/user";



const useSchema: Schema = new Schema({
    _id: { type: Types.ObjectId, default: () => new Types.ObjectId() },
    emailAddress:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    country:{type:String, required:true}, 
    photo:{type:String, required:false},
    phoneNumber:{type:String, required:false},
    isBlocked:{type:Boolean, required:false, default:false},
    isVerfied:{type:Boolean, required:false, default:false},
    socialmedia:{
        linkedin:{type:String, required:false},
        twitter:{type:String , required: false},
    },
    isInstructor:{type:String, required:false}

})

export const userModel = mongoose.model("User", useSchema)


