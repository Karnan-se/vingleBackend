import { ICategory } from "../entitties/interfaces/course/ICategory.ts";
import { ICategoryRepository } from "../entitties/interfaces/course/ICategoryRepository.ts";
import AppError from "../framework/web/utils/appError.ts";

interface  Dependency {
    repository :{
        categoryRepository:ICategoryRepository
    }
}

export default  class CategoryService{
    private categoryRepository
    constructor(dependecy:Dependency){
        this.categoryRepository = dependecy.repository.categoryRepository

    }

    async createNewCategory(category:ICategory){

        try {
            const addCategory = await this.categoryRepository.addCategory(category);
            if(!addCategory) throw AppError.conflict("category Creation failed")
               
                return addCategory
        
        } catch (error) {
            console.log(error)
            throw error
            
        }

        
    }
    async updateCategory(category:ICategory){
        try {
            const updateCategory = await this.categoryRepository.updateCategory(category)
            if(!updateCategory) throw AppError.conflict("Error updating")
                return updateCategory
            
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    async findAllCAtegory(){
        try {
            const allTheDetails = await this.categoryRepository.getAll();
            if(!allTheDetails) throw AppError.conflict("No Details Found")
                return allTheDetails;
            
        } catch (error) {
            throw error;
        }
    }
}