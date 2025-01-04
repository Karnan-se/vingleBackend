import CourseService from "../../usecases/CourseService";
import { Request, Response , NextFunction } from "express";
import qs from "qs"
import transformData from "../../framework/web/utils/transformData.ts";

interface controllerDependency {
    course:CourseService
}
interface MulterFile{
    thumbnail?: Express.Multer.File[] 
    fileUrl?: Express.Multer.File[] 
}


export default class CourseController{
    private Course
    constructor(useCase:controllerDependency){
        this.Course = useCase.course
    }
     newCourse = async(req:Request, res:Response, next:NextFunction)=>{
        try {
          
            const structuredData = transformData(req.body);
            console.log(structuredData, "structured Data")

          
            const files = req.files as MulterFile
            const thumbnailFile: Express.Multer.File[] = files.thumbnail ? [files.thumbnail[0]] : [];
            const fileUrlFile: Express.Multer.File[] = files.fileUrl ? files.fileUrl : [];
            console.log(fileUrlFile.length, "fileurls")
            
            const create = await this.Course.CreateCourse(structuredData, thumbnailFile, fileUrlFile)
            res.status(200).json({create})

            
        } catch (error) {
            console.log(error)
            throw error;
            
        }
    }
    getAllCourse = async(req:Request, res:Response, next:NextFunction)=>{
        try {
            const course = await this.Course.getAllCourse();
           
            console.log(course);


            
        } catch (error) {
            
        }


    }

}


