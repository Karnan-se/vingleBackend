import { ObjectId } from "mongoose";
import { IInstructor } from "./IInstructor";
import { Iuser } from "../user/user";

 interface IInstructorRepoInterface {
    createUser(user:IInstructor):Promise<IInstructor | null>
    findByUserId(userId:ObjectId | undefined):Promise<IInstructor>
    findById(_id:ObjectId | undefined):Promise<IInstructor>
    update: (applicationDetail: IInstructor | undefined) => Promise<IInstructor>;
    findAll(skip:number , limit:number , search : string , filterChanged :string):Promise<Iuser[]>
    // UpdateUser(user:IInstructor):any
}

export { IInstructorRepoInterface}
