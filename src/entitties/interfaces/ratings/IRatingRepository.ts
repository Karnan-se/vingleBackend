import { IRatings } from "../../../entitties/interfaces/ratings/IRatings";
import { ICourse } from "../../../entitties/interfaces/course/course";
import { ObjectId } from "mongoose";

export interface IRatingRepository {
    RatingsExists(userId: ObjectId, courseId: ObjectId): Promise<IRatings | undefined>;
    createRatings(ratings: IRatings): Promise<IRatings>;
    updateRatings(ratings: IRatings): Promise<IRatings>;
    updateRatingsInCourse(courseId: ObjectId, ratingId: ObjectId): Promise<ICourse>;
    averageCourseRatings(courseId: ObjectId): Promise<number>;
    individualRatings(courseId:ObjectId):Promise<any>
    courseRatings(courseId:ObjectId):Promise<IRatings[]>

}
