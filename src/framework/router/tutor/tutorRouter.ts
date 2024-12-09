import express from  "express"
import  { tutorController } from "../../dependencies/Tutordependency.ts"

const router = express.Router()


router.post("/tutorRegister",(req, res, next)=>tutorController.Signup(req, res, next))
router.post("/login",(req, res, next)=>tutorController.SignIn(req, res, next))

export default router