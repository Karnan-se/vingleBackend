import { ObjectId } from "mongoose";
import { ProgressModal } from "../models/Progress/ProgressModal.ts";
import { IProgress } from "../../../entitties/interfaces/Progress/IProgress.ts";
import IProgressRepository from "../../../entitties/interfaces/Progress/IprogressRepository.ts";
import AppError from "../../web/utils/appError.ts";

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

}