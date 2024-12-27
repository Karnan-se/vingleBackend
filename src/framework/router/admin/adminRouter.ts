import { adminApplicationController } from "../../dependencies/admin/adminApplication.ts";
import { adminController } from "../../dependencies/admin/admindependency.ts";
import express from "express"

const router = express.Router();

router.post("/adminRegister",(req, res, next)=>adminController.signup(req, res, next))
router.post("/login",(req, res, next)=>adminController.sigIn(req, res, next))
router.get("/getallStudents",(req, res, next)=> adminController.getAllusers(req, res, next) )
router.post("/tutorsApplication", (req, res, next)=>adminApplicationController.viewApplicationDetails(req, res, next) )
router.put("/approveApplication", (req, res, next)=>adminApplicationController.approveApplication(req, res, next))
router.put("/rejectApplication", (req, res, next)=> adminApplicationController.rejectApplication(req, res, next))

export default router