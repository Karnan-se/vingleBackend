import CategoryService from "../../../usecases/CategoryService";
import { CategoryRepository } from "../../database/repositories/CategoryRepository";
import CategoryController from "../../../adapters/controller/adminCategoryController";



const repository = {
    categoryRepository : new CategoryRepository()
}



 const categoryService = new CategoryService({repository})

 const categoryController = new CategoryController(categoryService)
 export {categoryController}