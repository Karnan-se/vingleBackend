import TutorUseCase from "../../usecases/tuotorService.ts";
import { Request , Response, NextFunction } from "express";
import { attachTokenCookie } from "../middleware/cookie.ts";



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
        return res.status(200).json({message:"Success", data:TutorCreate })  
    } catch (error) {
        next(error)
        
    }
}
async SignIn(req:Request, res:Response, next:NextFunction){
    try {
        const {emailAddress, password} = req.body.user;
        const {tutor, accessToken, refreshToken} = await this.tutorUseCase.SignIn(emailAddress, password)
        attachTokenCookie("AccessToken", accessToken, res);
        attachTokenCookie("RefreshToken", refreshToken, res);
        return res.status(200).json({message:"Success", data:tutor });

    } catch (error) {
        next(error)
        
    }

}

async updatedUser(req:Request, res:Response,next:NextFunction){
    try {
        const {user} = req.body
        const updatedUser = await this.tutorUseCase.updatedUser(user);
        res.status(200).json({message:"success", data:updatedUser}) 
        
    } catch (error) {
        console.log(error);
        next(error)
        
    }
}

}