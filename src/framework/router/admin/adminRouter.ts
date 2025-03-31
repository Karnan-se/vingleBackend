
import { adminApplicationController } from "../../dependencies/admin/adminApplication";
import { adminController } from "../../dependencies/admin/admindependency";
import { categoryController } from "../../dependencies/course/category";
import { orderController } from "../../dependencies/order/orderDependency";
import { revenueController } from "../../dependencies/revenue/revenueDependency";
import jwtAuth from "../../web/middlware/authentication"
import { courseController } from "../../dependencies/course/course";
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
router.get("/getCategories",  (req, res, next)=>categoryController.getCategories(req, res, next))
router.get("/fetchAdminChart" , jwtAuth , (req, res, next)=> revenueController.adminChartDetails(req, res, next))
router.get("/getAllOrders", jwtAuth , (req, res, next)=>orderController.getAllOrders(req, res, next) )
router.post("/updateCourse", jwtAuth , (req, res, next)=>courseController.updateCourse(req, res, next) )
router.get("/adminRevenue", jwtAuth ,  (req , res, next)=> revenueController.adminRevenue(req, res, next))

router.post("/sendCourseRejection", jwtAuth ,  (req, res, next)=> adminApplicationController.courseRejection(req, res, next))

router.get("/fetchadminRevenue", jwtAuth ,  (req , res, next)=> revenueController.getadminRevenue(req, res, next))



export default router 