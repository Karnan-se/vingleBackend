import { ObjectId } from "mongoose"
import { IProgress } from "./IProgress"


export default interface IProgressRepository {
    trackCourse(userId:ObjectId, courseId:ObjectId , ItemsId:string[]):Promise<IProgress | null>  
    createNewProgress(userId:ObjectId , courseId:ObjectId , ItemsId:string[]):Promise<IProgress>
    findCourseProgress(userId:ObjectId, courseId:ObjectId):Promise<IProgress>
}