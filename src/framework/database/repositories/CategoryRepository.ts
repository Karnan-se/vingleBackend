import { CategoryModal } from "../models/course/CategoryModal.ts";
import { ICategory } from "../../../entitties/interfaces/course/ICategory.ts";
import { ICourse } from "../../../entitties/interfaces/course/course.ts";
import { ObjectId } from "mongoose";
import { ICategoryRepository } from "../../../entitties/interfaces/course/ICategoryRepository.ts";

export class CategoryRepository implements ICategoryRepository{
    constructor(){

    }
    async addCategory(category:ICategory):Promise<ICategory>{
        try {
            const categorySaved = await CategoryModal.create({...category})
        console.log(categorySaved)
        return categorySaved as unknown as ICategory
            
        } catch (error) {
           
            throw error
            
        }
        

    }

    async updateCategory(category:ICategory):Promise<ICategory> {
        try {
            console.log("reached")
            const updatedCategory = await CategoryModal.findOneAndUpdate(
                { _id: category._id },      
                { $set: { ...category } },    
                { new: true }                 
              );

            console.log(updatedCategory ,  "uodateCategory")
            return updatedCategory as unknown as ICategory;
            
        } catch (error) {
            console.log(error)
           
            throw error
            
        }
    }
    async findByID(_id:ObjectId):Promise<ICategory> {
        try {
            const found  = await CategoryModal.findOne({_id})
            return found as unknown as ICategory
            
        } catch (error) {
            throw error;
            
        }
    }
    async getAll(): Promise<ICategory[]> {
        try {
            const allCategory = await CategoryModal.find({}).sort({ _id: -1 });
            console.log(allCategory , "allCategory")

            return allCategory as unknown as ICategory[]
            
        } catch (error) {
            throw error;
            
        }
    }
}