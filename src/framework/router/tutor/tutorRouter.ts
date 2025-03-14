import express from  "express"
import { tutorController } from "../../dependencies/tutor/Tutordependency.ts"
import tutorVerifyController from "../../dependencies/tutor/TutorVerifyDependecy.ts"
import { tutorApplicationController } from "../../dependencies/tutor/instructorDependency.ts"
import { uploadFile } from "../../../adapters/middleware/multer.ts"
import multer from "multer"
import jwtAuth from "../../web/middlware/authentication.ts"
import { courseController } from "../../dependencies/course/course.ts"
import { uploadVideo_thumbnail } from "../../../adapters/middleware/multervideo.ts"
import { conversationController } from "../../dependencies/conversation/conversationDependency.ts"
import { revenueController } from "../../dependencies/revenue/revenueDependency.ts"

const router = express.Router()


router.post("/tutorRegister",  (req, res, next)=>tutorController.Signup(req, res, next))
router.post("/login",  (req, res, next)=>tutorController.SignIn(req, res, next))
router.post("/resendOTP",   (req, res, next)=>tutorVerifyController.resendOTP(req, res, next))
router.post("/verifyUser",   (req, res, next)=> tutorVerifyController.verifyUser(req, res, next))
router.post("/applicationForm", uploadFile, jwtAuth, (req, res, next)=>tutorApplicationController.TutorApplication(req, res, next))
router.post("/update", jwtAuth, (req, res, next)=> tutorController.updatedUser(req, res,next))
router.post("/createCourse", uploadVideo_thumbnail, jwtAuth, (req, res, next)=>courseController.newCourse(req, res, next))
router.get("/getallCourse",jwtAuth, (req, res, next)=>courseController.getAllCourse(req, res, next))
router.put("/updateSection", jwtAuth, uploadVideo_thumbnail , (req, res, next)=> courseController.updateSection(req, res, next))
router.post("/getCourse", jwtAuth ,(req, res, next)=>courseController.getCourse(req, res, next))
router.post("/addnewSection", jwtAuth, uploadVideo_thumbnail , (req, res, next)=> courseController.addSection(req, res, next))
router.get("/tutorsCourse", jwtAuth, (req, res , next)=>courseController.tutorsCourse(req, res, next))
router.post("/getConversation" , jwtAuth ,  (req, res, next)=>conversationController.getConversation(req, res, next))
router.post("/fetchRevenue" , jwtAuth , (req,res,next) =>revenueController.getRevenue(req, res, next) )
router.get("/tutorsChart", jwtAuth , (req ,  res, next)=>revenueController.chartDetails(req, res , next))
router.get("/getAlltutors", jwtAuth , (req, res, next)=> tutorController.getAllTutors(req, res, next))
router.get("/fetchTutorByEmail", jwtAuth,(req, res, next)=> tutorController.fetchTutorByEmail(req, res, next))


export default router