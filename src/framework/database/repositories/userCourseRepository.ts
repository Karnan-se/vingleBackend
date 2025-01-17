import { ICourse } from "../../../entitties/interfaces/course/course.ts";
import { IuserCourseRepository } from "../../../entitties/interfaces/course/IuserCourseRepository.ts";
import { CourseModal } from "../models/tutor/CourseModel.ts";


export class UserCourseRepository implements IuserCourseRepository {
    constructor(){}
    
    async getAllCourse():Promise<ICourse>{


        try {
            const courses = await CourseModal.find().populate([
                {
                  path: "tutorId",
                  select: "_id emailAddress firstName", 
                },
                {
                  path: "category",
                  select: "name description", 
                },
                {
                  path: "sections",
                  populate: {
                    path: "items",
                  },
                },
                // {
                //   path: "ratings",
                //   select: "_id rating userId comment", 
                // },
                
              ]);
    
              console.log(courses)
              return courses as unknown as ICourse
        } catch (error) {
            throw error
            
        }

      
          

    }

}