import { IOrder } from "../../entitties/interfaces/Iorder/Iorder"
import { UserCourseService } from "../../usecases/userCourseService"
import { Request , Response , NextFunction } from "express"

interface useCase {
    userCourseService : UserCourseService

}

export class UserCourseController {
    private courseService
    constructor(useCase:useCase){
        this.courseService = useCase.userCourseService
    }

    async AllCourses (req:Request, res:Response, next : NextFunction){
        const courses  = await  this.courseService.getAllCourse()
        res.status(200).json({courses})

    }
    async checkout(req:Request, res:Response, next:NextFunction){
        try {
            const { price, courseName , courseImage , userInfo, course } = req.body;
            const {url , sessionId} = await this.courseService.payementPage( parseInt(price)*100, courseName , courseImage  , userInfo , course ) || {}
            if (!url || !sessionId) {
                throw new Error("Failed to retrieve payment session.");
              }
            const Orders:IOrder = {userId:userInfo._id, courseId:course._id,paymentId:sessionId , totalAmount:price  }
            const createOrders = await this.courseService.createOrder(Orders)
            console.log(createOrders, "order has been saved")
           
            res.json({url})
            
        } catch (error) {
            console.log(error)
            next(error)
            
        }
      
    }
    async verifyPayment(req:Request, res:Response, next:NextFunction){
        const {userInfo , sessionId} = req.body;
        console.log(userInfo, sessionId);
        const paymetupdate = await this.courseService.paymentverify(userInfo, sessionId)
        res.status(200).json(paymetupdate)
        
    }
}