import { IRatingRepository } from "../entitties/interfaces/ratings/IRatingRepository";
import { ObjectId } from "mongoose";
import { IRatings } from "../entitties/interfaces/ratings/IRatings";
import AppError from "../framework/web/utils/appError";

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

  async courseRatings(courseId : ObjectId){
    try {
      const ratings = await this.Ratings.courseRatings(courseId)
      return ratings 
      
    } catch (error) {
      console.log(error)
      throw error
      
    }
  }

  async averageRatings(courseId:ObjectId){
    try {
      const ratings = await this.Ratings.averageCourseRatings(courseId)
      console.log(ratings , "averageRatings")

      return ratings
      
    } catch (error) {
      console.log(error)
      throw AppError.conflict("errir fetchig the Average Ratings")
      
    }
  }
  

}
