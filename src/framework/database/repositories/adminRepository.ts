import { AdminModel } from "../models/admin/adminModel.ts";
import { IadminRepository } from "../../../entitties/interfaces/admin/Iadminrepository.ts";
import { Iadmin } from "../../../entitties/interfaces/admin/Iadmin.ts";


class adminRepository implements IadminRepository {
    createAdmin(user: Iadmin): Promise<Iadmin | null |any> {
        try {
            const admin = AdminModel.create(user);
            return admin as Iadmin | any
            
        } catch (error) {
            console.log(error)
            return error as any;  
        }
     
        
    }
    findByemail(email: string): Promise<Iadmin | null | any> {
      try {
        const admin = AdminModel.findOne({emailAddress:email});
        return admin 
      } catch (error) {
        return error as any
        
      }
    }

}
export default adminRepository