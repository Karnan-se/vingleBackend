
import { IOTP } from "../../../entitties/interfaces/admin/Iotp";
import OTPRepository from "../../../entitties/interfaces/common/IOTPRepository";
import { OTPMODEL } from "../models/general/otpModel";
import { ObjectId } from "mongoose";

export class MongoOtpRepository implements OTPRepository {

    async createOTP(otpData:IOTP):Promise<IOTP>{
        const createOtp = await OTPMODEL.create(otpData);
        if(createOtp){
            const otp:IOTP  ={
                    ...createOtp.toObject() as unknown as  IOTP,
                    _id:createOtp._id as ObjectId,
            }
            return otp as IOTP
        }
        throw new Error("Failed to create")

    }
   


    async findOTPbyEmail(email: string, OTP:string): Promise<IOTP | null> {
        try {
            

        const otpData = await OTPMODEL.findOne({email:email, otp:OTP})
        if(otpData){
            const otp :IOTP ={
                ...otpData.toObject() as unknown as IOTP,
                _id: otpData._id as ObjectId,
            }
            return otp
        }
        return otpData
    
}catch (error) {
    throw error
    
            
}

}

}