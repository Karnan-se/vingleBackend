import { IRatingRepository } from "../entitties/interfaces/ratings/IRatingRepository";
import { ObjectId } from "mongoose";
import { IRatings } from "../entitties/interfaces/ratings/IRatings";

interface Dependancy {
  repository: {
    ratingRepository: IRatingRepository;
  };
}

export class RatingService {
  private Ratings;
  constructor(dependancy: Dependancy) {
    this.Ratings = dependancy.repository.ratingRepository;
  }

  async saveRatings(ratings: IRatings) {
    try {
      const createRatings = await this.Ratings.createRatings(ratings);
      return createRatings;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async individualRatings(courseId:ObjectId){
    try {
      const getIndividualRatings = await this.Ratings.individualRatings(courseId)
      return getIndividualRatings
      
    } catch (error) {
      console.log(error)
      throw error
      
    }
  }
  

}
