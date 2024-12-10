import express from  "express"
import { tutorController } from "../../dependencies/tutor/Tutordependency.ts"
import tutorVerifyController from "../../dependencies/tutor/TutorVerifyDependecy.ts"

const router = express.Router()


router.post("/tutorRegister",(req, res, next)=>tutorController.Signup(req, res, next))
router.post("/login",(req, res, next)=>tutorController.SignIn(req, res, next))
router.post("/resendOTP",(req, res, next)=>tutorVerifyController.resendOTP(req, res, next))
router.post("/verifyUser",(req, res, next)=> tutorVerifyController.verifyUser(req, res, next))

export default router