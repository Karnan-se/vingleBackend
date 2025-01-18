import express from "express"
import { userController } from "../../dependencies/userdepencies.ts";
import verificationController from "../../dependencies/verificationDependency.ts";
import { googleController } from "../../dependencies/user/googledependency.ts";
import jwtAuth from "../../web/middlware/authentication.ts";
import { userCourseController } from "../../dependencies/course/userCourseDependency.ts";





const userRouter = express.Router();

userRouter.post("/userRegister", (req,res,next)=>userController.signup(req,res,next) )
userRouter.post("/login",  (req, res, next)=> userController.signIn(req, res, next))
userRouter.post("/resendOTP",  (req, res, next)=>verificationController.resendOTP(req, res, next))
userRouter.post("/verifyUser",  (req, res, next)=> verificationController.verifyUser(req, res, next))
userRouter.post("/auth/google/verify",  (req, res, next)=>googleController.signIn(req, res, next))
userRouter.post("/update", jwtAuth, (req, res, next)=> userController.updatedUser(req, res,next))
userRouter.post("/sendotp",  (req, res, next)=> userController.SendOTP(req, res, next))
userRouter.put("/changepassword",jwtAuth, (req, res, next)=> userController.ChangePassword(req, res, next))
userRouter.get("/getallCourse", jwtAuth ,(req, res, next)=> userCourseController.AllCourses(req, res, next) )
userRouter.post("/create-checkout-session", jwtAuth, (req, res, next)=> userCourseController.checkout(req, res, next))
userRouter.post("/verifyPayment", jwtAuth,(req, res, next)=> userCourseController.verifyPayment(req, res, next))




export default userRouter