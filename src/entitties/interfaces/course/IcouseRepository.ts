import { ICourse, IItem } from "./course";
import { InputSection } from "./course";
import { ISection } from "./course";
import { ObjectId } from "mongoose";
import { InputCourse } from "./course";

export interface ICourseRepository {
  createCourse(course: ICourse): Promise<ICourse>;
  getAllCourseFromDataBase(): Promise<ICourse[]>;
  updateItem(section: InputSection): Promise<ObjectId[]> 
  createNewItem(section: any): Promise<ObjectId[]>;
  getcourse(courseId: ObjectId): Promise<ICourse>;
  filterItemsId(sectionID:ObjectId | undefined  , items_ids: ObjectId[] , sectionTitle:string):Promise<any>
  addnewSection(section:ISection):Promise<any>
  courseUpdate(sectionId:ObjectId , courseId:ObjectId):Promise<any>
  tutorsCourse(tutorsId:ObjectId):Promise<ICourse[]>
  updateCourse(courseId:ObjectId , course:ICourse):Promise<ICourse>
  paginatedCourse(skip:number ,limit:number , search:string , filterChange:string , tutorId: string):Promise<{course :InputCourse[] , totalCourse : number }>

}
