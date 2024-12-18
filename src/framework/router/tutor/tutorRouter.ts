import express from  "express"
import { tutorController } from "../../dependencies/tutor/Tutordependency.ts"
import tutorVerifyController from "../../dependencies/tutor/TutorVerifyDependecy.ts"
import { tutorApplicationController } from "../../dependencies/tutor/instructorDependency.ts"
import { uploadFile } from "../../../adapters/middleware/multer.ts"
import multer from "multer"

const router = express.Router()


router.post("/tutorRegister",(req, res, next)=>tutorController.Signup(req, res, next))
router.post("/login",(req, res, next)=>tutorController.SignIn(req, res, next))
router.post("/resendOTP",(req, res, next)=>tutorVerifyController.resendOTP(req, res, next))
router.post("/verifyUser",(req, res, next)=> tutorVerifyController.verifyUser(req, res, next))
// router.post("/applicationForm", (req, res, next) => {
//     uploadFile(req, res, (err) => {
//         if (err) {
//             console.error("Multer error:", err);
//             return res.status(400).json({ error: err.message });
//         }
        
//         console.log("req.files:", req.files); 
//         console.log("req.body:", req.body);   

//         res.status(200).json({ message: "Data received", files: req.files, body: req.body });
//     });
// });
router.post("/applicationForm", uploadFile, (req, res, next)=>tutorApplicationController.TutorApplication(req, res, next))



export default router