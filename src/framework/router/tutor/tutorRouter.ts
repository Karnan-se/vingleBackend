import express from  "express"
import { tutorController } from "../../dependencies/tutor/Tutordependency"
import tutorVerifyController from "../../dependencies/tutor/TutorVerifyDependecy"
import { tutorApplicationController } from "../../dependencies/tutor/instructorDependency"
import { uploadFile } from "../../../adapters/middleware/multer"
import multer from "multer"
import jwtAuth from "../../web/middlware/authentication"
import { courseController } from "../../dependencies/course/course"
import { uploadVideo_thumbnail } from "../../../adapters/middleware/multervideo"
import { conversationController } from "../../dependencies/conversation/conversationDependency"
import { revenueController } from "../../dependencies/revenue/revenueDependency"
import { Request , Response , NextFunction } from "express"

const router = express.Router()

const checker =(req :Request, res:Response, next:NextFunction)=>{
    try {
        console.log(req.body , "checks the requeest")
        next()

        
    } catch (error) {
        console.log(error);
        throw error
        
    }
}


router.post("/tutorRegister",  (req, res, next)=>tutorController.Signup(req, res, next))
router.post("/login",  (req, res, next)=>tutorController.SignIn(req, res, next))
router.post("/resendOTP",   (req, res, next)=>tutorVerifyController.resendOTP(req, res, next))
router.post("/verifyUser",   (req, res, next)=> tutorVerifyController.verifyUser(req, res, next))
router.post("/applicationForm", uploadFile, jwtAuth, (req, res, next)=>tutorApplicationController.TutorApplication(req, res, next))
router.post("/update", jwtAuth, (req, res, next)=> tutorController.updatedUser(req, res,next))
router.post("/createCourse",  uploadVideo_thumbnail, checker , (req, res, next)=>courseController.newCourse(req, res, next))
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