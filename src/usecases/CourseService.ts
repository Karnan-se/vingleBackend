import { ICourse, IItem, ISection } from "../entitties/interfaces/course/course.ts"
import { ICourseRepository } from "../entitties/interfaces/course/IcouseRepository.ts"
import AppError from "../framework/web/utils/appError.ts"
import { ICloudinaryService } from "../entitties/interfaces/service.ts/IcloudinaryService.ts"
import { InputCourse } from "../entitties/interfaces/course/course.ts"






interface Dependency{
    Repository:{
        courseRepository:ICourseRepository
    },
    Service :{
        cloudinaryService:ICloudinaryService
    }

}



export default  class CourseService {
    private Course
    private cloudinarySevice
    constructor(dependency:Dependency){
        this.Course = dependency.Repository.courseRepository
        this.cloudinarySevice = dependency.Service.cloudinaryService

    }

    async CreateCourse(course:any ,thumbnailFile:Express.Multer.File[], fileUrl:Express.Multer.File[] | null){
        try {
            console.log(fileUrl, "fileUrl")
            let uploadedVideoUrl :string[] = []
            if (fileUrl) {
                uploadedVideoUrl = await Promise.all(
                    fileUrl.map((file) => this.cloudinarySevice.uploadCompressedVideo(file))
                );
            }

            let thumbnailurl
            if(thumbnailFile){
                thumbnailurl = await this.cloudinarySevice.uploadThumbnail(thumbnailFile[0])
            }


            const section = course.sections.map((section: any) => {
                section.items.forEach((item: IItem, index: number) => {
                    item.fileUrl = uploadedVideoUrl[index]; 
                });
                return section; 
            });



            console.log(section)

            const courseup ={...course , thumbnail : thumbnailurl || "", tags:course.learningObjectives || [], section : section}
            const newCourse = await this.Course.createCourse(courseup)
            console.log(newCourse, "heello tjis is courseDetail")
            
            return newCourse
              
        } catch (error) {
            console.log(error)
            throw error
        }
        

    }
    async getAllCourse(){
        try {
            const course = await this.Course.getAllCourseFromDataBase();
            console.log(course  , "courses Populated")
            
            return course;   
        } catch (error) {
            throw AppError.conflict("Error getting the course Details")
            
        }
    }
}