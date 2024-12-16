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
    async SendOTP(req:Request, res:Response, next :NextFunction){
      const {email} = req.body.user;
      try {
        const sendOTP = await this.userUseCase.sendOTP(email);
        console.log(sendOTP);
        
        res.status(200).json({message:"success" ,data:sendOTP})
         
      } catch (error) {
        next(error)
        
      }
    }
    async ChangePassword(req:Request, res:Response, next: NextFunction){
      const {emailAddress, password} = req.body.user;
      try {
        const userDetails = await this.userUseCase.changePassword(emailAddress, password);
        if(userDetails){
          return res.status(200).json({data:userDetails})
        }
        
      } catch (error) {
        next(error)
        
      }

      
    }
  }