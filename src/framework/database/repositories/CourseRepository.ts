import { ObjectId } from "mongoose";
import {
  ICourse,
  IItem,
  ISection,
  InputSection,
} from "../../../entitties/interfaces/course/course.ts";
import {
  CourseModal,
  ItemModal,
  SectionModal,
} from "../models/tutor/CourseModel.ts";
import { ICourseRepository } from "../../../entitties/interfaces/course/IcouseRepository.ts";

export default class CourseRepository implements ICourseRepository {
  constructor() {}

  async createCourse(course: ICourse): Promise<ICourse> {
    try {
      const sectionId = await Promise.all(
        course.sections.map(async (section: any) => {
          const ItemsId = await Promise.all(
            section.items.map(async (item: IItem) => {
              const createdItem = await ItemModal.create(item);
              return createdItem._id;
            })
          );
          const createdSection = await SectionModal.create({
            ...section,
            items: ItemsId,
          });
          return createdSection._id;
        })
      );

      const saveCourse = await CourseModal.create({
        ...course,
        sections: sectionId,
      });
      return saveCourse as unknown as ICourse;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getAllCourseFromDataBase(): Promise<ICourse> {
    try {
      const courses = await CourseModal.find().populate({
        path: "sections",
        populate: {
          path: "items",
        },
      });
      return courses as unknown as ICourse;
    } catch (error) {
      throw error;
    }
  }
  async updateSection(section: InputSection): Promise<IItem> {
    try {
      const updatedItems = await Promise.all(
        section.items.map(async (item: IItem) => {
          return await ItemModal.findOneAndUpdate(
            { _id: item._id },
            { $set: { ...item } },
            { new: true }
          );
        })
      );
      console.log(updatedItems, "updated Items ")

   

      return updatedItems as unknown as IItem;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createNewSection(section: any): Promise<ISection> {
    try {
      const createdItems = await Promise.all(
        section.items.map(async (item: any) => {
          const createdItem = await ItemModal.create({...item});
          return createdItem;
        })
      );
  
      console.log(createdItems, "This is created items which are saved");
  
    
      const createdItemIds = createdItems.map((item) => item._id).reverse();

      console.log(createdItemIds  ,  "createddItemss . -id  ");
  
    
      const updatedSection = await SectionModal.findOneAndUpdate(
        { _id: section._id }, 
        { $push: { items: { $each: createdItemIds} } }, 
        { new: true } 
      );
      return updatedSection as unknown as ISection;
    } catch (error) {
      console.error("Error in createNewSection:", error);
      throw error;
    }
  }
  
  async getcourse(courseId: ObjectId): Promise<ICourse> {
    try {
      
      const courseDetails = await CourseModal.findById(courseId).populate({
        path: "sections",
        populate: {
          path: "items",
        },
      });
      return courseDetails as unknown as ICourse;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
