import mongoose  from "mongoose";
import { Schema, model} from "mongoose";

const OTPSChema: Schema = new Schema({
    email:{type: String, required:true},
    otp:{type: String, requied:true},
    created_at:{type:Date, default:Date.now, expires:"1m"}
})

export  const OTPMODEL = model("OTP", OTPSChema)