import VerificationService from "../../usecases/userVerificationService";
import { Request, Response, NextFunction } from "express";

interface ControllerDependency {
    verfication : VerificationService
}



export  default class VerificationController {
    private verfication 
    constructor(usecase: ControllerDependency){
        this.verfication  = usecase.verfication;
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
                
            }
        }
}

 
