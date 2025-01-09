import { ObjectId } from "mongoose"

export interface ICategory {
     _id?:ObjectId,
    name?:string,
    description?:string,
    isBlocked?:boolean
}