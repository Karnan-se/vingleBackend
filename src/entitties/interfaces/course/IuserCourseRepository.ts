import { ICourse } from "./course"


export interface IuserCourseRepository {
  getAllCourse():Promise<ICourse>
}