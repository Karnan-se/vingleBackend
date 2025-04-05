import { ObjectId } from "mongoose";
import {
  ICourse,
  IItem,
  ISection,
  InputCourse,
  InputSection,
} from "../../../entitties/interfaces/course/course";
import {
  CourseModal,
  ItemModal,
  SectionModal,
} from "../models/tutor/CourseModel";
import { ICourseRepository } from "../../../entitties/interfaces/course/IcouseRepository";
import { OrderModal } from "../models/course/OrderModal";



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
  async getAllCourseFromDataBase(): Promise<ICourse[]> {
    try {
      const courses = await CourseModal.find().populate({
        path: "sections",
        populate: {
          path: "items",
        },
      });
      return courses as unknown as ICourse[];
    } catch (error) {
      throw error;
    }
  }
  async updateItem(section: InputSection): Promise<ObjectId[]> {
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
      const updatedId = updatedItems.filter((item)=> item?._id).map((itemId:any)=> itemId._id)

      // console.log(updatedId , "updatedId")
      return updatedId as unknown as ObjectId[]
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createNewItem(section: any): Promise<ObjectId[]> {
    try {
      const createdItems = await Promise.all(
        section.items.map(async (item: any) => {
          const createdItem = await ItemModal.create({...item});
          return createdItem;
        })
      );
  
    
  
    
      const createdItemIds = createdItems.map((item) => item._id).reverse();

     
  
    
      const updatedSection = await SectionModal.findOneAndUpdate(
        { _id: section._id }, 
        { $push: { items: { $each: createdItemIds} } }, 
        { new: true } 
      );
      return createdItemIds as unknown as ObjectId[];
    } catch (error) {
      console.error("Error in createNewSection:", error);
      throw error;
    }
  }
  
  async getcourse(courseId: ObjectId): Promise<ICourse> {
    try {
      
      const courseDetails =await CourseModal.findById(courseId).populate([
        {
          path: "tutorId",
          
        },
        {
          path: "category",
          
        },
        {
          path: "sections",
          populate: {
            path: "items",
          },
        },
        {
          path: "ratings",
          select: "_id ratingValue userId review", 
        },
      ]);
      return courseDetails as unknown as ICourse;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async filterItemsId(sectionID:ObjectId , items_ids: ObjectId[] , sectionTitle:string):Promise<any> {

    
    try {
      const section = await SectionModal.updateOne({_id:sectionID}, {$set:{items: items_ids , title : sectionTitle}})
      console.log(section);
      return section
      
    } catch (error) {
      console.log(error)
      
    }

  }
  async addnewSection(section:ISection):Promise<any> {
    try {
      const createSection = await SectionModal.create({...section});
      return createSection
      
    } catch (error) {
      console.log(error);
      throw error;
      
    }

  }
  async courseUpdate(sectionId: ObjectId , courseId:ObjectId): Promise<any> {
    try {
      const courseUpdated = await CourseModal.findOneAndUpdate(
        { _id: courseId }, 
        { $addToSet: {sections: sectionId } }, 
        { new: true }
      );

      
      return courseUpdated
      
    } catch (error) {
      console.log(error)
      throw error
      
    }
  }
  
  async tutorsCourse(tutorsId:ObjectId):Promise<ICourse[]>{
    const tutorsCourse  = await  CourseModal.find({tutorId:tutorsId}).populate([
      {
        path: "tutorId",
        
      },
      {
        path: "category",
        
      },
      {
        path: "sections",
        populate: {
          path: "items",
        },
      },
      {
        path: "ratings",
        select: "_id ratingValue userId review", 
      },
    ]);
    return tutorsCourse as unknown as ICourse[]

  }

  async findCourseById(courseId:ObjectId):Promise<ICourse>{ 
    try {
      const course = await CourseModal.findOne({_id:courseId})
    return course as unknown as  ICourse
      
    } catch (error) {
      console.log(error)
      throw error;
      
    }
  }


  async updateCourse(courseId:ObjectId , course:ICourse):Promise<ICourse>{
    try {
      const updatedCourse = await CourseModal.findOneAndUpdate({_id:courseId}, {$set:{...course}}, {new:true})
      console.log("updatedCourse")
      return updatedCourse as unknown as ICourse
      
    } catch (error) {
      console.log(error)
      throw error
      
    }
  }


  
  async paginatedCourse(skip: number, limit: number, search: string, filterChange: string, tutorId:string): Promise<{ course: InputCourse[]; totalCourse: number; }> {
    try {
      let filter: any = {};
      
  
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: "i" } },
          { price: { $regex: search, $options: "i" } }
        ];
      }
      

      if (filterChange) {
        if (filterChange === "true") {
          filter.isPublished = true;
        } else if (filterChange === "false") {
          filter.isPublished = false;
        }
      
      }

      if (tutorId) {
        filter.tutorId = tutorId;
      }
      
    
      const course = await CourseModal.find(filter)
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit)
        .lean() as unknown as InputCourse[];
      
  
      const totalCourse = await CourseModal.countDocuments(filter);
      
      return { course, totalCourse };
    } catch (error) {
      console.error("Error in paginatedCourse:", error);
      throw new Error("Failed to fetch paginated courses");
    }
  }

 
  
}
