import { Iuser } from "./user"
import { ObjectId } from "mongoose"

 interface IuserRepository {
    createUser(user:Iuser):Promise<Iuser>
    findUserByEmail(email:string | undefined):any
    UpdateUser(user:Iuser):Promise<Iuser >
    findUserById(_id: string | ObjectId | undefined): Promise<Iuser >  
    findAlluser():Promise<Iuser>
    findPaginatedUsers(skip: number, limit: number , search:string , filterchange : string) :Promise<{students:Iuser[] , totalStudents: number}>
}

export { IuserRepository}
