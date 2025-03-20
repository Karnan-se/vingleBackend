import { ICourse } from "../../../entitties/interfaces/course/course";
import { IuserCourseRepository } from "../../../entitties/interfaces/course/IuserCourseRepository";
import { CourseModal } from "../models/tutor/CourseModel";


export class UserCourseRepository implements IuserCourseRepository {
    constructor(){}
    
    async getAllCourse():Promise<ICourse>{


        try {
            const courses = await CourseModal.find().populate([
                {
                  path: "tutorId",
                  
                },
                {
                  path: "category",
                  
                },
                {
                  path: "sections",
                  populate: {
                    path: "items",
                  },
                },
                {
                  path: "ratings",
                  select: "_id ratingValue userId review", 
                },
                
              ]);
    
              
              return courses as unknown as ICourse
        } catch (error) {
            throw error
            
        }

      
          

    }

}