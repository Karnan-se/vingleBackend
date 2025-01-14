import { IuserCourseRepository } from "../entitties/interfaces/course/IuserCourseRepository.ts"
interface Dependency{
 Repository :{
    courseRepository: IuserCourseRepository
}

}


export class UserCourseService {
    private course

    constructor(dependency:Dependency){
        this.course = dependency.Repository.courseRepository;

    }

    async getAllCourse(){
        const courses = await this.course.getAllCourse();
        console.log(courses , "coourses")

    }
}