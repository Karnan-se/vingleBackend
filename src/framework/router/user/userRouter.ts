import express from "express"
import { userController } from "../../dependencies/userdepencies.ts";
import verificationController from "../../dependencies/verificationDependency.ts";
import { googleController } from "../../dependencies/user/googledependency.ts";





const userRouter = express.Router();

userRouter.post("/userRegister",(req,res,next)=>userController.signup(req,res,next) )
userRouter.post("/login", (req, res, next)=> userController.signIn(req, res, next))
userRouter.post("/resendOTP",(req, res, next)=>verificationController.resendOTP(req, res, next))
userRouter.post("/verifyUser",(req, res, next)=> verificationController.verifyUser(req, res, next))
userRouter.post("/auth/google/verify", (req, res, next)=>googleController.signIn(req, res, next))
userRouter.post("/update",(req, res, next)=> userController.updatedUser(req, res,next))




export default userRouter