import { RatingService } from "../../../usecases/ratingservice.ts";
import { RatingsRepository } from "../../database/repositories/RatingsRepository.ts";
import { RatingsController } from "../../../adapters/controller/ratingsController.ts";




const repository  = {
    ratingRepository : new RatingsRepository()
}

const ratingservice = new RatingService({repository})

export const ratingsController = new RatingsController(ratingservice)