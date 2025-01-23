import mongoose, { ObjectId } from "mongoose"
import IProgressRepository from "../entitties/interfaces/Progress/IprogressRepository.ts"
import { IProgress } from "../entitties/interfaces/Progress/IProgress.ts"
import AppError from "../framework/web/utils/appError.ts"

interface Dependency {
     Repository  :{
        progresRepository : IProgressRepository
    }

}



export default class ProgressServcie {
    private Progress
    constructor(dependency:Dependency){
        this.Progress = dependency.Repository.progresRepository

    }
    async isCourseTracked(userId:ObjectId, courseId:ObjectId , itemsId:string[]){
        const trackCourse = await this.Progress.trackCourse(userId, courseId , itemsId)
        return trackCourse
    }
    async createProgress(userId:ObjectId , courseId:ObjectId , itemsId:string[]){
        const progress = await this.Progress.createNewProgress(userId, courseId , itemsId)
        console.log(progress, "progress")
        return progress

    }
    async updateProgress(userId:ObjectId, courseId:ObjectId, itemId:string, percentageCompleted:number){
        console.log("reached servie")
        const findProgress = await this.Progress.findCourseProgress(userId, courseId) 
        // console.log(findProgress, "findProgress")
        if(!findProgress){
            throw AppError.conflict("prrogres doesnot find")
        }
        if (!Array.isArray(findProgress.completedItems)) {
            findProgress.completedItems = [];
        }
        const objectItemId = new mongoose.Schema.Types.ObjectId(itemId)
        const item = findProgress.completedItems.find((completed) =>
            completed.itemId?.toString() == itemId.toString()
          );
          console.log("reached here")
          console.log(item)
        if(percentageCompleted > item!.percentageCompleted){
            item!.percentageCompleted = percentageCompleted
        }
        console.log(findProgress , "findProgress")
        await findProgress.save()
        return findProgress;
    
    }
    
}