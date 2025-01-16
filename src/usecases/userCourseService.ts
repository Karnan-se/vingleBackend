import { IuserCourseRepository } from "../entitties/interfaces/course/IuserCourseRepository.ts"
import { IPaymentService } from "../entitties/interfaces/service.ts/IPaymentService.ts"
interface Dependency{
 Repository :{
    courseRepository: IuserCourseRepository
},
service :{
    paymentService : IPaymentService
}

}


export class UserCourseService {
    private course
    private paymentService

    constructor(dependency:Dependency){
        this.course = dependency.Repository.courseRepository;
        this.paymentService = dependency.service.paymentService

    }

    async getAllCourse(){
        const courses = await this.course.getAllCourse();
        console.log(courses , "coourses")
        return courses

    }

    async payementPage(price:number, courseName:string , courseImage:string){

    const session = await this.paymentService.checkoutPage(price, courseName, courseImage)
    console.log(session.url)

    }
}