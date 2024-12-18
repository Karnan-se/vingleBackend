import { IInstructor } from "./IInstructor";

 interface IInstructorRepoInterface {
    createUser(user:IInstructor):Promise<IInstructor | null>
    // findUserByEmail(email:IInstructor | undefined):any
    // UpdateUser(user:IInstructor):any
}

export { IInstructorRepoInterface}
