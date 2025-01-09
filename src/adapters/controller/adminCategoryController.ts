import CategoryService from "../../usecases/CategoryService.ts";
import { Request , Response , NextFunction } from "express";

export default class CategoryController {
    private category
    constructor(usecase:CategoryService){
        this.category = usecase

    }

    async AddCategory(req:Request, res:Response, next:NextFunction){
        try {
        
            const createcategory = await this.category.createNewCategory(req.body);
            return res.status(200).json({createcategory})
  
        } catch (error) {
            console.log(error);
            throw error
            
        }
    }
    async updateCategory(req:Request, res:Response, next:NextFunction){
        try {
            console.log(req.body , "hello")
            const updateCategory = await this.category.updateCategory(req.body)
            res.status(200).json({data:updateCategory})
            
        } catch (error) {
            next(error)
            
        }
    }
    async getCategories(req:Request, res:Response, next:NextFunction){
        try {
            const getAllCategory = await this.category.findAllCAtegory();
            console.log(getAllCategory)
            res.status(200).json({data:getAllCategory});

            
        } catch (error) {
            
        }
    }
}