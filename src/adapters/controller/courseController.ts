import CourseService from "../../usecases/CourseService";
import { Request, Response , NextFunction } from "express";
import transformData from "../../framework/web/utils/transformData";
import { ISection } from "../../entitties/interfaces/course/course";
import multer from "multer";
import { file } from "googleapis/build/src/apis/file/index";
import mongoose, { ObjectId } from "mongoose";
import AppError from "../../framework/web/utils/appError";
import { ErrorTypes } from "../../entitties/Enums/errorTypes";
import { HttpStatus } from "../../entitties/Enums/statusCode";

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
            res.status(HttpStatus.OK).json({create})

            
        } catch (error) {
            console.log(error)
            throw error;
            
        }
    }
    getAllCourse = async(req:Request, res:Response, next:NextFunction)=>{
        try {
            const course = await this.Course.getAllCourse();
           return  res.status(HttpStatus.OK).json(course)

        } catch (error) {
            next(error)
            
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
            res.status(HttpStatus.OK).json({updateSection})
  

        } catch (error) {
            console.log(error)
            next(error)
            
        }
    }
    getCourse = async(req:Request, res:Response, next:NextFunction)=>{
        try {
            const {courseId} = req.body;
            console.log(courseId , "course._Id ")
            // console.log(req.body)
            const course = await this.Course.getCourse(courseId);
           
            res.status(HttpStatus.OK).json({course})
            
        } catch (error) {
            next(error)
            
        }

    }

    addSection = async(req:Request, res:Response, next:NextFunction)=>{
        try {
            const {sectionData, course_id, fileIndex, } = req.body;
            const files = req.files as MulterFile;
            const fileUrlFile: Express.Multer.File[] = files?.fileUrl ? files?.fileUrl : [];
            const index: number[] = Array.isArray(fileIndex)  ? fileIndex.map(Number)  : [parseInt(fileIndex, 10)];
            console.log(index);
            console.log(sectionData)
            console.log(course_id)
            
            const addNewsection = await this.Course.addNewSections(course_id, fileIndex, fileUrlFile, JSON.parse(sectionData))
            console.log(addNewsection, "addnewSection")
            res.status(HttpStatus.OK).json({addNewsection})
   

        } catch (error) {
            next(error)
            
        }
    }

    tutorsCourse = async(req:Request, res:Response, next:NextFunction) =>{
        try {
            const {tutorId} = req.query
            if(!tutorId){
               throw AppError.conflict(ErrorTypes.MISSING_ID)
               

            }
            console.log(tutorId , "tutorId")
            const id = new mongoose.Types.ObjectId(tutorId as string);
            console.log(id, "objectID")
            const tutorsCourse = await this.Course.tutorsCourse(id as unknown as  ObjectId)
            res.status(HttpStatus.OK).json(tutorsCourse)
            
        } catch (error) {
            console.log(error , "error")
            next(error)
        }
    }
    updateCourse = async(req: Request , res:Response , next: NextFunction)=>{
        try {
            const {courseId, courseDetails } = req.body
            console.log(courseId , courseDetails,  "courseId and course")

            const updatedCourse = await this.Course.updateCourse(courseId, courseDetails)
            res.status(HttpStatus.OK).json({updatedCourse})
        } catch (error) {
            next(error)
        }
    }

}


