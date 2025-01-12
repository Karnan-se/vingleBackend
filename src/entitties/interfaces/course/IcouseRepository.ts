import { ICourse, IItem } from "./course";
import { InputSection } from "./course";
import { ISection } from "./course";
import { ObjectId } from "mongoose";

export interface ICourseRepository {
  createCourse(course: ICourse): Promise<ICourse>;
  getAllCourseFromDataBase(): Promise<ICourse>;
  updateSection(section: InputSection): Promise<IItem>;
  createNewSection(section: any): Promise<ISection>;
  getcourse(courseId: ObjectId): Promise<ICourse>;
}
