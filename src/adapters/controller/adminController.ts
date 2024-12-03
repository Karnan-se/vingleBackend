import adminUseCase from "../../usecases/adminService.ts";
import { Request, Response, NextFunction } from "express";
import { attachTokenCookie } from "../middleware/cookie.ts";






export  class AdminController {
    private adiminUseCase : adminUseCase
    constructor(useCase : adminUseCase){
        this.adiminUseCase =useCase
    }
    async signup(req: Request, res:Response, next:NextFunction){
        try{
        const user = req.body.user;
      const {accesToken, refreshToken, adminDetails} = await this.adiminUseCase.signup(user);
      attachTokenCookie("AccessToken", accesToken, res)
      attachTokenCookie("RefreshToken", refreshToken, res)
      res.status(200).json({message:"succuss", data:adminDetails})
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
        res.status(200).json({message:"Succuss", data:adminDetail})

        
    } catch (error) {
        console.log(error)
        next(error)
        
    }
}
    
   
}