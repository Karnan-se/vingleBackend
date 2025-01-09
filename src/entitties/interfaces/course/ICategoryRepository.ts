import { ObjectId } from "mongoose"

import { ICategory } from "./ICategory"
export interface ICategoryRepository {
     updateCategory(category:ICategory):Promise<ICategory>
     addCategory(category:ICategory):Promise<ICategory>
     findByID(_id:ObjectId):Promise<ICategory>
     getAll():Promise<ICategory[]>
}