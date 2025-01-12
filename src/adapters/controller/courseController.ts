import CourseService from "../../usecases/CourseService";
import { Request, Response , NextFunction } from "express";
import qs from "qs"
import transformData from "../../framework/web/utils/transformData.ts";
import { ISection } from "../../entitties/interfaces/course/course.ts";
import multer from "multer";
import { file } from "googleapis/build/src/apis/file/index";

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

            console.log(req.body , "reached at ")
          
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
           return  res.status(200).json(course)

        } catch (error) {
            
        }


    }

     updateSection = async(req:Request, res:Response, next:NextFunction)=>{
        try {
            const {section_id , sectionData , fileIndex} = req.body;
 
            const files = req.files as MulterFile
            const fileUrlFile: Express.Multer.File[] = files?.fileUrl ? files?.fileUrl : [];
            let index: number[] = [];
            if (Array.isArray(fileIndex)) {
                index = fileIndex.map(Number);
            } else {
                index.push(parseInt(fileIndex, 10)); 
            }

            console.log(index)
            
            const updateSection = await this.Course.updateSection(index, fileUrlFile , JSON.parse(sectionData))
            res.status(200).json({updateSection})
  

        } catch (error) {
            console.log(error)
            next(error)
            
        }
    }
    getCourse = async(req:Request, res:Response, next:NextFunction)=>{
        const {courseId} = req.body;
        console.log(courseId , "course._Id ")
        console.log(req.body)
        const course = await this.Course.getCourse(courseId);
       
        res.status(200).json({course})
    }

}


