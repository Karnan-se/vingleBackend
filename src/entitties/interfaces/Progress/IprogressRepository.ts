import { ObjectId } from "mongoose"
import { IProgress } from "./IProgress"
import IpasswordService from "../service.ts/passwordService"


export default interface IProgressRepository {
    trackCourse(userId:ObjectId, courseId:ObjectId , ItemsId:string[]):Promise<IProgress | null>  
    createNewProgress(userId:ObjectId , courseId:ObjectId , ItemsId:string[]):Promise<IProgress>
    findCourseProgress(userId:ObjectId, courseId:ObjectId):Promise<IProgress>
    updateProgress(Progress:IProgress):Promise<IProgress>
    getProgress(userId:ObjectId , courseId:ObjectId):Promise<IProgress>
}