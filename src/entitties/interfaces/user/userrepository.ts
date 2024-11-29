import { Iuser } from "./user"

 interface IuserRepository {
    createUser(user:Iuser):Promise<Iuser | null>
    findUserByEmail(email:string | undefined):any
}

export { IuserRepository}
