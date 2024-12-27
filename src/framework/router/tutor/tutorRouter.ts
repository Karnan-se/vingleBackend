import express from  "express"
import { tutorController } from "../../dependencies/tutor/Tutordependency.ts"
import tutorVerifyController from "../../dependencies/tutor/TutorVerifyDependecy.ts"
import { tutorApplicationController } from "../../dependencies/tutor/instructorDependency.ts"
import { uploadFile } from "../../../adapters/middleware/multer.ts"
import multer from "multer"
import jwtAuth from "../../web/middlware/authentication.ts"

const router = express.Router()


router.post("/tutorRegister",(req, res, next)=>tutorController.Signup(req, res, next))
router.post("/login",(req, res, next)=>tutorController.SignIn(req, res, next))
router.post("/resendOTP",(req, res, next)=>tutorVerifyController.resendOTP(req, res, next))
router.post("/verifyUser",(req, res, next)=> tutorVerifyController.verifyUser(req, res, next))
router.post("/applicationForm", uploadFile, jwtAuth, (req, res, next)=>tutorApplicationController.TutorApplication(req, res, next))
router.post("/update",(req, res, next)=> tutorController.updatedUser(req, res,next))




export default router