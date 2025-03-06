import TutorUseCase from "../../usecases/tuotorService.ts";
import { Request , Response, NextFunction } from "express";
import { attachTokenCookie } from "../middleware/cookie.ts";
import { HttpStatus } from "../../entitties/Enums/statusCode.ts";
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

}