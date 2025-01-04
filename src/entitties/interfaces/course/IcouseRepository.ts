import { ICourse } from "./course";

export interface ICourseRepository {
  createCourse(course: ICourse): Promise<ICourse>;
  getAllCourseFromDataBase():Promise<ICourse>

}