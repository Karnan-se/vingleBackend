import express from "express"
import { userController } from "../../dependencies/userdepencies.ts";
import verificationController from "../../dependencies/verificationDependency.ts";
import { googleController } from "../../dependencies/user/googledependency.ts";
import jwtAuth from "../../web/middlware/authentication.ts";





const userRouter = express.Router();

userRouter.post("/userRegister",jwtAuth, (req,res,next)=>userController.signup(req,res,next) )
userRouter.post("/login", jwtAuth, (req, res, next)=> userController.signIn(req, res, next))
userRouter.post("/resendOTP", jwtAuth, (req, res, next)=>verificationController.resendOTP(req, res, next))
userRouter.post("/verifyUser", jwtAuth, (req, res, next)=> verificationController.verifyUser(req, res, next))
userRouter.post("/auth/google/verify", jwtAuth, (req, res, next)=>googleController.signIn(req, res, next))
userRouter.post("/update", jwtAuth, (req, res, next)=> userController.updatedUser(req, res,next))
userRouter.post("/sendotp", jwtAuth, (req, res, next)=> userController.SendOTP(req, res, next))
userRouter.put("/changepassword",jwtAuth, (req, res, next)=> userController.ChangePassword(req, res, next))




export default userRouter