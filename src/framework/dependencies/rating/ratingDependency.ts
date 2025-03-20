import { RatingService } from "../../../usecases/ratingservice";
import { RatingsRepository } from "../../database/repositories/RatingsRepository";
import { RatingsController } from "../../../adapters/controller/ratingsController";




const repository  = {
    ratingRepository : new RatingsRepository()
}

const ratingservice = new RatingService({repository})

export const ratingsController = new RatingsController(ratingservice)