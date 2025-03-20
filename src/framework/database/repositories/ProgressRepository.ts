import { ObjectId } from "mongoose";
import { ProgressModal } from "../models/Progress/ProgressModal";
import { IProgress } from "../../../entitties/interfaces/Progress/IProgress";
import IProgressRepository from "../../../entitties/interfaces/Progress/IprogressRepository";
import AppError from "../../web/utils/appError";
import { CourseModal } from "../models/tutor/CourseModel";
import { ICourse } from "../../../entitties/interfaces/course/course";

export  default class ProgressRepository implements IProgressRepository {


    constructor(){ }


    async trackCourse(userId:ObjectId, courseId:ObjectId , itemsId:string[]):Promise<IProgress | null>{
       try {
        const istracked = await ProgressModal.findOne({userId:userId, courseId:courseId })
        if (istracked) {
            
            itemsId.forEach((item) => {
              const alreadyExists = istracked.completedItems.some(
                (completed) =>completed.itemId && completed.itemId.toString() === item
              );
              if (!alreadyExists) {
                istracked.completedItems.push({ itemId: item });
              }
            });
      
            await istracked.save();
            return istracked as unknown as IProgress
            
        }
        return null
      
        
       } catch (error) {
        console.log(error)
        throw error
        
       }
    }
    async createNewProgress(userId:ObjectId , courseId:ObjectId, itemsId:string[]):Promise<IProgress> {
        try {
            const isExists = await this.trackCourse(userId, courseId, itemsId);
            if(!isExists){
                const completedItems = itemsId.map((itemId) => ({ itemId }));
                const  createnew = await ProgressModal.create({userId, courseId, completedItems})
                return createnew as unknown as IProgress 
            }else{
                return isExists as unknown as IProgress

            }
           
            

        } catch (error) {
            console.log(error)
            throw error
            
        }
    }
    async findCourseProgress(userId: ObjectId, courseId: ObjectId): Promise<IProgress> {
        try {
            const progress = await ProgressModal.findOne({userId, courseId})
            return  progress as unknown as IProgress
            
        } catch (error) {
            console.log(error)
            throw error
            
        }
       
    
    }
    async updateProgress(Progress:IProgress):Promise<IProgress>{
        try {
            const userId = Progress.userId
            const courseId = Progress.courseId
            const updateProgress = await ProgressModal.findOneAndUpdate({userId ,courseId },{$set:{...Progress}},{new:true})
            return updateProgress as unknown as  IProgress
            
        } catch (error) {
            console.log(error)
            throw error;
            
        }

    }
  async getProgress(userId: ObjectId, courseId: ObjectId): Promise<IProgress> {
    try {
        const progress = await ProgressModal.findOne({userId, courseId})
        return progress as unknown as IProgress

        
    } catch (error) {
        console.log(error)
        throw error
        
    }
      
  }

  async courseDetails(courseId:ObjectId):Promise<ICourse> {
    try {
        const courseDetails = await CourseModal.findOne({_id:courseId}).populate("tutorId")
        console.log(courseDetails)
        return courseDetails as unknown as ICourse
        
    } catch (error) {
        console.log(error)
        throw error
        
    }
  }

}