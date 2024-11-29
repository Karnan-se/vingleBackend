import { Request, Response, NextFunction } from "express";
import UserUseCase from "../../usecases/userServices"
import { Iuser } from "../../entitties/interfaces/user/user";





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
        return res.status(201).json({ success: true, data: createdUser });
      } catch (error: any) {
        return res.status(400).json({ success: false, message: error.message });
      }
    }

    
    async signIn(req:Request, res:Response, next:NextFunction){
      const user = req.body.user;
      console.log(user)
      try {
        const uservalidated = await this.userUseCase.signIn(user);
        
         res.status(200).json({success:true, data:uservalidated})
    
      } catch (error:any) {
        next(error)
        // return res.status(400).json({success:false, message: error.message})
      }

    }
  }