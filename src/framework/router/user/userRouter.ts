import express from "express"
import { userController } from "../../dependencies/userdepencies";
import verificationController from "../../dependencies/verificationDependency";
import { googleController } from "../../dependencies/user/googledependency";
import jwtAuth from "../../web/middlware/authentication";
import { userCourseController } from "../../dependencies/course/userCourseDependency";
import { progresssController } from "../../dependencies/Progress/progresDependency";
import ConversationController from "../../../adapters/controller/conversationController";
import { conversationController } from "../../dependencies/conversation/conversationDependency";
import { ratingsController } from "../../dependencies/rating/ratingDependency";
import { certificateController } from "../../dependencies/certificate/certificateDependency";
import { courseController } from "../../dependencies/course/course";





const userRouter = express.Router();

userRouter.post("/userRegister", (req,res,next)=>userController.signup(req,res,next) )
userRouter.post("/login",  (req, res, next)=> userController.signIn(req, res, next))
userRouter.post("/resendOTP",  (req, res, next)=>verificationController.resendOTP(req, res, next))
userRouter.post("/verifyUser",  (req, res, next)=> verificationController.verifyUser(req, res, next))
userRouter.post("/auth/google/verify",  (req, res, next)=>googleController.signIn(req, res, next))
userRouter.post("/update", jwtAuth, (req, res, next)=> userController.updatedUser(req, res,next))
userRouter.post("/sendotp",  (req, res, next)=> userController.SendOTP(req, res, next))
userRouter.put("/changepassword", (req, res, next)=> userController.ChangePassword(req, res, next))
userRouter.get("/getallCourse", (req, res, next)=> userCourseController.AllCourses(req, res, next) )
userRouter.post("/create-checkout-session", jwtAuth, (req, res, next)=> userCourseController.checkout(req, res, next))
userRouter.post("/verifyPayment", jwtAuth,(req, res, next)=> userCourseController.verifyPayment(req, res, next))
userRouter.post("/isorderCompleated", jwtAuth, (req, res, next)=> userCourseController.isOrderCompleated(req, res, next))
userRouter.post("/alluserOrder", jwtAuth, (req, res, next)=> userCourseController.alluserOrder(req,res,next))
userRouter.get("/isprogressTracked" , jwtAuth , (req, res, next)=> progresssController.isCourseProgressed(req, res, next))
userRouter.post("/createProgress", (req, res, next)=>progresssController.createProgress(req, res, next))
userRouter.post("/updateProgressPercentage", jwtAuth , (req, res, next)=> progresssController.updateProgress(req, res, next))
userRouter.post("/sendMessage", jwtAuth,(req, res, next)=> conversationController.sendMessage(req, res, next) )
userRouter.post("/fetchMessage",  jwtAuth, (req, res , next) => conversationController.fetchMessage(req, res, next))
userRouter.post("/findUserById" ,jwtAuth, (req, res , next)=> userController.findUserBYId(req, res, next))
userRouter.post("/saveRatings", jwtAuth ,(req, res, next)=> ratingsController.createRatings(req, res, next))
userRouter.get("/getProgress", (req, res, next)=> progresssController.getProgress(req, res, next))
userRouter.get("/getUserCertificate", jwtAuth , (req, res, next)=> certificateController.getUserCertificate(req, res, next))
userRouter.post("/getCourse", jwtAuth ,(req, res, next)=>courseController.getCourse(req, res, next))
userRouter.get("/logout", (req, res, next)=> userController.userLogout(req, res, next) )
userRouter.post("/block", (req, res, next)=> userController.blockUser(req, res, next) )

userRouter.get("/courseRatings", jwtAuth  , (req, res, next)=> ratingsController.getcourseRatings(req, res, next))
userRouter.get("/getIndividualRatings", jwtAuth , (req, res, next)=> ratingsController.IndividualRatings(req, res, next))


export default userRouter