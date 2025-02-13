import { RatingService } from "../../usecases/ratingservice"
import { Request , Response , NextFunction } from "express"

export class RatingsController {
    private RatingsService
    constructor(usecase:RatingService){
        this.RatingsService = usecase

    }

    createRatings = async (req:Request, res:Response, next :NextFunction)=>{
        try {
            const {ratings} = req.body;
            console.log(ratings , "ratings")
            const createRatings = await this.RatingsService.saveRatings(ratings)
            res.status(200).json({createRatings})
        } catch (error) {
            console.log(error)
            next(error)
            
        }
    }
}