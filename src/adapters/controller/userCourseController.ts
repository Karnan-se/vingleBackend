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
        const { price, courseName , courseImage } = req.body;

        console.log( price, courseName )
        const checkoutPage = await this.courseService.payementPage( parseInt(price), courseName , courseImage )

    }
}