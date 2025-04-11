import { RatingService } from "../../usecases/ratingservice"
import { Request , Response , NextFunction } from "express"
import { HttpStatus } from "../../entitties/Enums/statusCode"
import mongoose, { ObjectId } from "mongoose"

export class RatingsController {
    private RatingsService
    constructor(usecase:RatingService){
        this.RatingsService = usecase

    }

    createRatings = async (req:Request, res:Response, next :NextFunction)=>{
        try {
            const {ratings} = req.body;
         
            const createRatings = await this.RatingsService.saveRatings(ratings)
            res.status(HttpStatus.OK).json({createRatings})
        } catch (error) {
            console.log(error)
            next(error)
            
        }
    }

    async getcourseRatings(req:Request , res:Response, next:NextFunction){
        try {
            const {courseId} = req.query
            console.log(courseId , "courseId")
            const courseIds = new mongoose.Types.ObjectId(courseId as string)
            const courseRatings = await this.RatingsService.courseRatings(courseIds as unknown as ObjectId)
            res.status(HttpStatus.OK).json({courseRatings})
             
        } catch (error) {
            console.log(error)
            throw error;
            
        }
    }

    async IndividualRatings(req:Request, res:Response , next:NextFunction){
        try {
            const {courseId} = req.query
            const id = new mongoose.Types.ObjectId(courseId as string)
            const courseRatings = await this.RatingsService.individualRatings(id as unknown as  ObjectId)
            res.status(HttpStatus.OK).json({courseRatings})
             
            
        } catch (error) {
            console.log(error)
            throw error
            
        }
    }

    
   
}