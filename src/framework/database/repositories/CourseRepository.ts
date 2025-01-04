import { ObjectId } from "mongoose";
import { ICourse, IItem, ISection } from "../../../entitties/interfaces/course/course.ts";
import { CourseModal, ItemModal, SectionModal } from "../models/tutor/CourseModel.ts";
import { ICourseRepository } from "../../../entitties/interfaces/course/IcouseRepository.ts";

export default class CourseRepository implements ICourseRepository {
    constructor(){

    }

    async createCourse(course: ICourse):Promise<ICourse> {
        try {
            const sectionId = await Promise.all(
                course.sections.map(async (section:any)=> {
                    const ItemsId = await Promise.all(
                        section.items.map(async(item:IItem)=> {
                            const createdItem = await ItemModal.create(item)
                            return createdItem._id
                        })
                    )
                    const createdSection = await SectionModal.create({
                        ...section, items: ItemsId
                    })
                    return createdSection._id
                })
               )
        
               const saveCourse = await CourseModal.create({
                ...course, sections:sectionId
               })
               return saveCourse as unknown as ICourse;
            
        } catch (error) {
            console.log(error)
            throw error;
            
        }
      
    
}
 async getAllCourseFromDataBase():Promise<ICourse>{
    try {
        const course = await CourseModal.find();
        return course as unknown as ICourse
        
    } catch (error) {
        throw error
        
    }

 }
}