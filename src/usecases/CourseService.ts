import { ICourse, IItem, InputSection, ISection } from "../entitties/interfaces/course/course.ts"
import { ICourseRepository } from "../entitties/interfaces/course/IcouseRepository.ts"
import AppError from "../framework/web/utils/appError.ts"
import { ICloudinaryService } from "../entitties/interfaces/service.ts/IcloudinaryService.ts"
import { isValidObjectId,  } from "mongoose"
import { ObjectId } from "mongoose"






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
            return course;   
        } catch (error) {
            throw AppError.conflict("Error getting the course Details")
            
        }
    }
    async updateSection(
        fileIndex: number[],
        fileUrlFile: Express.Multer.File[],
        section: InputSection
      ) {
        try {
          if (!fileIndex && !fileUrlFile) {
            console.log("fileUrl is not available");
            const updateSection = await this.Course.updateItem(section);
            console.log(updateSection, "updated but there is no fileUrl");
            return updateSection;
          }
      
          if (fileUrlFile) {
            const uploadPromises = fileUrlFile.map(async (file, index) => {
              if (file.mimetype.startsWith("video/")) {
                console.log("Uploading video... please wait");
                const videoUrl = await this.cloudinarySevice.uploadCompressedVideo(file);
                console.log(videoUrl, "videoUrl uploaded");
                section.items[fileIndex[index]].fileUrl = videoUrl as unknown as string;
              } else {
                console.log("Uploading PDF... please wait");
                const pdfUrl = await this.cloudinarySevice.uploadPDF(file);
                console.log(pdfUrl, "pdfUrl uploaded");
                section.items[fileIndex[index]].fileUrl = pdfUrl as unknown as string;
              }
            });
      
            await Promise.all(uploadPromises);
          }
          
      
          const promises = section.items.map(async (item) => {
            console.log(item, "items check ")
            if (!item._id) {
            
              console.log(item, "this is the Item going to save on the database");
              return await this.Course.createNewSection({
                ...section,
                items: [item], 
              });
            } else {
            
              console.log(item, "this is updated by the way");
              return await this.Course.updateItem({
                ...section,
                items: [item], 
              });
            }
          });
          
          
          const results = await Promise.all(promises);
          
          console.log(results, "result of the saved course from updating");
          console.log(results.length)
          const sectionId = section._id
          const flatResult  = results.flat()

          await this.filteritems(sectionId, flatResult)

          return results;
          
        } catch (error) {
          console.error("Error in updateSection:", error);
          throw error;
        }
      }
      
    async getCourse(courseId:ObjectId){
        try {
            const courseDetail = await this.Course.getcourse(courseId)
        
            return courseDetail 
            
        } catch (error) {
            console.log(error)
            throw error;
            
        }
    }

    async filteritems(section_id:ObjectId | undefined,  result:ObjectId[]):Promise<void>{
      try {
        let objectID = result
        .flat(Infinity)
       
       console.log(objectID , "ObjectId")
       const filtered = await this.Course.filterItemsId(section_id , objectID)
       console.log(filtered)
        
        
      } catch (error) {
        
      }
    }
}