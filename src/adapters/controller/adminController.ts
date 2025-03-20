import adminUseCase from "../../usecases/adminService";
import { Request, Response, NextFunction } from "express";
import { attachTokenCookie } from "../middleware/cookie";
import { HttpStatus } from "../../entitties/Enums/statusCode";






export  class AdminController {
    private adiminUseCase : adminUseCase
    constructor(useCase : adminUseCase){
        this.adiminUseCase =useCase
    }
    async signup(req: Request, res:Response, next:NextFunction){
        try{
        const user = req.body.user;
      const {accesToken, refreshToken, adminDetails} = await this.adiminUseCase.signup(user);
      attachTokenCookie("AccessToken", accesToken, res, )
      attachTokenCookie("RefreshToken", refreshToken, res)
      res.status(HttpStatus.OK).json({message:"succuss", data:adminDetails})
    }catch(error){
        next(error)

    }
}
async sigIn(req:Request, res:Response, next:NextFunction){
    try {
        const {emailAddress,password } = req.body.user;
        const {adminDetail, refreshToken, accessToken} = await this.adiminUseCase.signIn(emailAddress, password)
        attachTokenCookie("AccessToken", accessToken, res)
        attachTokenCookie("RefreshToken", refreshToken, res)
        res.status(HttpStatus.OK).json({message:"Succuss", data:adminDetail})

        
    } catch (error) {
        console.log(error)
        next(error)
        
    }
}
async getAllusers(req:Request, res:Response, next:NextFunction){
    try {
        const students = await this.adiminUseCase.getAllStudents()
        return res.status(HttpStatus.OK).json({students})
        
    } catch (error) {
        next(error)
        
    }
}
    
   
}