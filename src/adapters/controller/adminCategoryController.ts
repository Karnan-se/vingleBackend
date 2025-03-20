import CategoryService from "../../usecases/CategoryService";
import { Request , Response , NextFunction } from "express";
import { HttpStatus } from "../../entitties/Enums/statusCode";

export default class CategoryController {
    private category
    constructor(usecase:CategoryService){
        this.category = usecase

    }

    async AddCategory(req:Request, res:Response, next:NextFunction){
        try {
        
            const createcategory = await this.category.createNewCategory(req.body);
            return res.status(HttpStatus.OK).json({createcategory})
  
        } catch (error) {
            console.log(error);
            throw error
            
        }
    }
    async updateCategory(req:Request, res:Response, next:NextFunction){
        try {
            console.log(req.body , "hello")
            const updateCategory = await this.category.updateCategory(req.body)
            res.status(HttpStatus.OK).json({data:updateCategory})
            
        } catch (error) {
            next(error)
            
        }
    }
    async getCategories(req:Request, res:Response, next:NextFunction){
        try {
            const getAllCategory = await this.category.findAllCAtegory();
            res.status(HttpStatus.OK).json({data:getAllCategory});

            
        } catch (error) {
            next(error)
            
        }
    }
}