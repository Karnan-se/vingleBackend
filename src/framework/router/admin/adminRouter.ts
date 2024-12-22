import { adminController } from "../../dependencies/admin/admindependency.ts";
import express from "express"

const router = express.Router();

router.post("/adminRegister",(req, res, next)=>adminController.signup(req, res, next))
router.post("/login",(req, res, next)=>adminController.sigIn(req, res, next))
router.get("/getallStudents",(req, res, next)=> adminController.getAllusers(req, res, next) )
// router.get("/tutorsApplication", (req, res, next)=> )

export default router;