import { ObjectId } from "mongoose";
import { IInstructor } from "./IInstructor";

 interface IInstructorRepoInterface {
    createUser(user:IInstructor):Promise<IInstructor | null>
    findByUserId(userId:ObjectId | undefined):Promise<IInstructor>
    // UpdateUser(user:IInstructor):any
}

export { IInstructorRepoInterface}
