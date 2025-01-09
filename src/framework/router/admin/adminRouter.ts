
import { adminApplicationController } from "../../dependencies/admin/adminApplication.ts";
import { adminController } from "../../dependencies/admin/admindependency.ts";
import { categoryController } from "../../dependencies/course/category.ts";
import jwtAuth from "../../web/middlware/authentication.ts"
import express from "express"


const router = express.Router();

router.post("/adminRegister",(req, res, next)=>adminController.signup(req, res, next))
router.post("/login",(req, res, next)=>adminController.sigIn(req, res, next))
router.get("/getallStudents", jwtAuth ,(req, res, next)=>   adminController.getAllusers(req, res, next) )
router.post("/tutorsApplication", jwtAuth , (req, res, next)=>adminApplicationController.viewApplicationDetails(req, res, next) )
router.put("/approveApplication", jwtAuth ,  (req, res, next)=>adminApplicationController.approveApplication(req, res, next))
router.put("/rejectApplication", jwtAuth ,  (req, res, next)=> adminApplicationController.rejectApplication(req, res, next))
router.post("/createCategory", jwtAuth,  (req, res, next)=>categoryController.AddCategory(req, res, next) )
router.post("/updateCategory", jwtAuth, (req, res, next)=>categoryController.updateCategory(req, res, next))
router.get("/getCategories", jwtAuth, (req, res, next)=>categoryController.getCategories(req, res, next))

export default router