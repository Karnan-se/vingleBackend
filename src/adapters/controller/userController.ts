import { Request, Response, NextFunction } from "express";
import UserUseCase from "../../usecases/userServices"

import { attachTokenCookie } from "../middleware/cookie.ts";





export class UserController {
    private userUseCase: UserUseCase;
  
    constructor(userUseCase: UserUseCase) {
      this.userUseCase = userUseCase;
    }
  
    async signup(req: Request, res: Response, next: NextFunction) {
      try {
        const user = req.body.user;
        console.log(user)
        const createdUser = await this.userUseCase.signup(user)
         res.status(201).json({ success: true, data: createdUser });
      } catch (error: any) {
        console.log(error)
        next(error)
      }
    }

    
    async signIn(req:Request, res:Response, next:NextFunction){
      const user = req.body.user;
      console.log(user)
      try {
        const {existingUser, accessToken, refreshToken} = await this.userUseCase.signIn(user);
        console.log(accessToken, "accessToken \n") 
        console.log(refreshToken, "RefreshToken") 
        attachTokenCookie("AccessToken", accessToken, res)
        attachTokenCookie("RefreshToken", refreshToken, res)
         res.status(200).json({success:true, data:existingUser})
    
      } catch (error:any) {
        next(error)
        // return res.status(400).json({success:false, message: error.message})
      }

    }
    async updatedUser(req:Request, res:Response, next:NextFunction){
      const user = req.body.user;
      console.log(user);
      try {
        const updatedUser = await  this.userUseCase.UpdateUser(user)
        console.log(updatedUser, "updated User")
        res.status(200).json({message:"success", data:updatedUser}) 
      } catch (error) {
        next(error)
        
      }
    }
  }