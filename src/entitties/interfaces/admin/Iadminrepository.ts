import { Iadmin } from "./Iadmin";

interface IadminRepository {
    findByemail(email:string | undefined):Promise<Iadmin | any >
    createAdmin(user:Iadmin | undefined):Promise <Iadmin |any >
}

export {IadminRepository}