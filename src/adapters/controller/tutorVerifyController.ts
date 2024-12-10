
import TutorVerifivationService from "../../usecases/tutorverification.ts";
import { Request, Response, NextFunction } from "express";


export default class TutorVerifyController{
    private verfication

    
    constructor(usecase:TutorVerifivationService){
        this.verfication = usecase;
        
    }
    resendOTP = async(req:Request, res:Response, next:NextFunction)=>{
        const {email} = req.body;
        try {
            const sendOTP = await this.verfication.resendOTP(email)
            res.status(200).json({data: sendOTP})
            
        } catch (error) {
            console.log(error)
            next(error)
            
        }
    }
        verifyUser = async(req:Request, res:Response, next:NextFunction)=>{
            const {userDetails, otp} = req.body.payload
            console.log(userDetails, otp)
            
            try {
                const verifyUser = await this.verfication.VerifyOTP(userDetails, otp)
                res.status(200).json({data: verifyUser})
            } catch (error) {
                console.log(error)
                next
                (error)
                
            }
        }
}