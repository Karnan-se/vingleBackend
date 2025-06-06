import TutorUseCase from "../../usecases/tuotorService";
import { Request , Response, NextFunction } from "express";
import { attachTokenCookie } from "../middleware/cookie";
import { HttpStatus } from "../../entitties/Enums/statusCode";
import AppError from "../../framework/web/utils/appError";

export default class TutorController {
    private tutorUseCase:TutorUseCase
    constructor(tutorUseCase: TutorUseCase){
        this.tutorUseCase = tutorUseCase
}
async Signup(req:Request, res: Response, next:NextFunction){
    try {
        const user = req.body.user;
        console.log(user, "In Controller")
        const {TutorCreate, refreshToken, accessToken} = await this.tutorUseCase.SignUp(user)
        attachTokenCookie("AccessToken", accessToken, res)
        attachTokenCookie("RefreshToken", refreshToken, res);
        return res.status(HttpStatus.OK).json({message:"Success", data:TutorCreate })  
    } catch (error) {
        next(error)
        
    }
}
async SignIn(req:Request, res:Response, next:NextFunction){
    try {
        const {emailAddress, password} = req.body.user;
        const {tutor, accessToken, refreshToken} = await this.tutorUseCase.SignIn(emailAddress, password)
        console.log(refreshToken, "\n" , accessToken )
        attachTokenCookie("AccessToken", accessToken, res);
        attachTokenCookie("RefreshToken", refreshToken, res);
        return res.status(HttpStatus.OK).json({message:"Success", data:tutor });

    } catch (error) {
        next(error)
        
    }

}

async updatedUser(req:Request, res:Response,next:NextFunction){
    try {
        const {user} = req.body
        const updatedUser = await this.tutorUseCase.updatedUser(user);
        res.status(HttpStatus.OK).json({message:"success", data:updatedUser}) 
        
    } catch (error) {
        console.log(error);
        next(error)
        
    }
}

async getAllTutors(req:Request , res:Response, next:NextFunction){
    try {
        const tutors = await this.tutorUseCase.getAllTutors()
        res.status(HttpStatus.OK).json({tutors})
        
    } catch (error) {
        next(error)
        
    }
}
async fetchTutorByEmail(req:Request, res:Response, next:NextFunction){
    try {
        const emailList = req.query.emailAddress as string[];
        if(!emailList){
            throw AppError.conflict("emailList is Empty")
        }
        console.log(emailList , "emailLists")
        const tutors = await this.tutorUseCase.fetchTutorByEmail(emailList)
        console.log(tutors , "tutors Availbale")
        res.status(HttpStatus.OK).json({tutors})
        
    } catch (error) {
        next(error)
        
    }
}
async tutorLogout(req:Request , res:Response , next:NextFunction){
    try {
        const refreshToken = req.cookies["RefreshToken"];
        console.log(refreshToken, "\n", "refreshtoken");
        res.clearCookie("RefreshToken");
        res.clearCookie("AccessToken");
        res.status(HttpStatus.OK).json({ message: "REfreshToken Cleard" });
        
    } catch (error) {
        
    }
}

async sendOtp(req:Request, res:Response, next:NextFunction){
    try {
        const {email} = req.body.user
        const sendOTP = await this.tutorUseCase.sendOTP(email)
        res.status(HttpStatus.OK).json({ message: "success", data: sendOTP });
        
    } catch (error) {
        next(error)
        
    }


}
async verifyOtp(req:Request, res:Response, next:NextFunction){
    try {
        const {userDetails, otp} = req.body.payload

        const verifyOtp = await this.tutorUseCase.verifyOTP(userDetails.userInfo.emailAddress , otp)
        res.status(HttpStatus.OK).json({message:"success", data:verifyOtp})
        
    } catch (error) {
        next(error)
        
    }   

}
async changePassword(req:Request, res:Response, next:NextFunction){
    try {
        const { emailAddress, password } = req.body.user;
        const changePassword = await this.tutorUseCase.changePassword(emailAddress, password)
        res.status(HttpStatus.OK).json({message:"success", data:changePassword})
        
    } catch (error) {
        next(error)
        
    }
}
}