import { IRatings } from "../../../entitties/interfaces/ratings/IRatings.ts"
import { RatingModal } from "../models/course/ratingModel.ts"
import { CourseModal } from "../models/tutor/CourseModel.ts"
import { ICourse } from "../../../entitties/interfaces/course/course.ts"
import { ObjectId } from "mongoose"



export class RatingsRepository {
    constructor(){
    }

    RatingsExists = async (userId: ObjectId, courseId: ObjectId): Promise<IRatings | undefined> => {
        try {
            const rating = await RatingModal.findOne({ userId, courseId }) as unknown as IRatings | null;
            return rating || undefined;
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    };


    createRatings = async (ratings:IRatings):Promise<IRatings> =>{
        try {
            const ratingsExists = await this.RatingsExists(ratings.userId as unknown as ObjectId , ratings.courseId as unknown as ObjectId)
            if(ratingsExists){
                const updateRatings = await this.updateRatings(ratings)
                console.log("already exists so updated the ratings")
                return updateRatings 
            }
            const createRatings = await RatingModal.create(ratings)
            console.log(createRatings , "ratings has created")
            const courseId = createRatings.courseId
            const ratingId = createRatings._id
            const updateInCourse = this.updateRatingsInCourse(courseId as unknown as ObjectId, ratingId as unknown as ObjectId)
            return createRatings as  unknown as IRatings
            
        } catch (error) {
            console.log(error)
            throw error
            
        }


    }
    updateRatings = async (ratings : IRatings):Promise<IRatings> =>{
        try {
            const updatedRatings = await RatingModal.findOneAndUpdate({courseId:ratings.courseId , userId:ratings.userId}, {$set:{...ratings}},{new:true})
            const averageRatings = await this.averageCourseRatings(ratings.courseId as unknown as ObjectId)
            const updateCourse = await CourseModal.updateOne({_id:ratings.courseId}, {$set:{averageRating:averageRatings}})
            console.log(updatedRatings , "updatedRatings")
            return updatedRatings as unknown as IRatings
            
        } catch (error) { 
            console.log(error)
            throw error
            
        }
    }
    updateRatingsInCourse = async(courseId:ObjectId , ratingId:ObjectId):Promise<ICourse>=>{
        try {
            const updatedRating= await CourseModal.findOneAndUpdate({_id:courseId}, {$push:{ratings:ratingId}},{new:true})
            const averageRatings = await this.averageCourseRatings(courseId as unknown as ObjectId)
            const updateCourse = await CourseModal.updateOne({_id:courseId}, {$set:{averageRating:averageRatings}})
            console.log(updateCourse , "updatedCourse")
            return updatedRating as unknown as ICourse
        } catch (error) {
            console.log(error)
            throw error
            
        }
    }
    averageCourseRatings = async(courseId:ObjectId):Promise<number>=>{
    try {

        const averageRatings = await RatingModal.aggregate([{$match:{courseId:courseId}},{$group:{_id:"$ratingValue", averageRatings:{$avg:"$ratingValue"}},}])
        console.log(averageRatings[0] , "averageRatings")
        return averageRatings.length > 0 ? averageRatings[0].averageRatings : 0;
        
    } catch (error) {
        console.log(error)
            throw error
    }


    }
    

}