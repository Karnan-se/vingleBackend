import { RatingService } from "../../usecases/ratingservice"
import { Request , Response , NextFunction } from "express"
import { HttpStatus } from "../../entitties/Enums/statusCode"

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
   
}