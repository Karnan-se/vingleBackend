import express from "express"
import { userController } from "../../dependencies/userdepencies.ts";




const userRouter = express.Router();

 


userRouter.post("/userRegister",(req,res,next)=>userController.signup(req,res,next) )
userRouter.post("/login", (req, res, next)=> userController.signIn(req, res, next))

export default userRouter