import { ObjectId } from "mongoose";


export interface IOTP {
    _id?:ObjectId,
    email:string,
    otp:string,
    created_at?: Date

}