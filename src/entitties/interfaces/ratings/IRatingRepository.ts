import { IRatings } from "../../../entitties/interfaces/ratings/IRatings.ts";
import { ICourse } from "../../../entitties/interfaces/course/course.ts";
import { ObjectId } from "mongoose";

export interface IRatingRepository {
    RatingsExists(userId: ObjectId, courseId: ObjectId): Promise<IRatings | undefined>;
    createRatings(ratings: IRatings): Promise<IRatings>;
    updateRatings(ratings: IRatings): Promise<IRatings>;
    updateRatingsInCourse(courseId: ObjectId, ratingId: ObjectId): Promise<ICourse>;
    averageCourseRatings(courseId: ObjectId): Promise<number>;
}
