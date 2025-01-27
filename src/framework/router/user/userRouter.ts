import express from "express"
import { userController } from "../../dependencies/userdepencies.ts";
import verificationController from "../../dependencies/verificationDependency.ts";
import { googleController } from "../../dependencies/user/googledependency.ts";
import jwtAuth from "../../web/middlware/authentication.ts";
import { userCourseController } from "../../dependencies/course/userCourseDependency.ts";
import { progresssController } from "../../dependencies/Progress/progresDependency.ts";
import ConversationController from "../../../adapters/controller/conversationController.ts";
import { conversationController } from "../../dependencies/conversation/conversationDependency.ts";





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
userRouter.post("/isorderCompleated", jwtAuth, (req, res, next)=> userCourseController.isOrderCompleated(req, res, next))
userRouter.post("/alluserOrder", jwtAuth, (req, res, next)=> userCourseController.alluserOrder(req,res,next))
userRouter.get("/isprogressTracked" , jwtAuth , (req, res, next)=> progresssController.isCourseProgressed(req, res, next))
userRouter.post("/createProgress",jwtAuth, (req, res, next)=>progresssController.createProgress(req, res, next))
userRouter.post("/updateProgressPercentage", jwtAuth , (req, res, next)=> progresssController.updateProgress(req, res, next))
userRouter.post("/sendMessage", jwtAuth,(req, res, next)=> conversationController.sendMessage(req, res, next) )
export default userRouter