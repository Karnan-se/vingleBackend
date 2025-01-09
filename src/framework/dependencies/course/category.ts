import CategoryService from "../../../usecases/CategoryService.ts";
import { CategoryRepository } from "../../database/repositories/CategoryRepository.ts";
import CategoryController from "../../../adapters/controller/adminCategoryController.ts";



const repository = {
    categoryRepository : new CategoryRepository()
}



 const categoryService = new CategoryService({repository})

 const categoryController = new CategoryController(categoryService)
 export {categoryController}