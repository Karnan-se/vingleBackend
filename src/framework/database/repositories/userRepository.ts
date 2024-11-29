import { userModel } from "../models/userModels.ts";  //this part is from mongo modal
import { IuserRepository } from "../../../entitties/interfaces/user/userrepository.ts";
import { Iuser } from "../../../entitties/interfaces/user/user.ts";
import AppError from "../../web/utils/appError.ts";


export class MongoUserRepository implements IuserRepository{

    async createUser(user: any): Promise<Iuser | null> {
        console.log(user, "Received User Data"); 
    
        try {

            const createdUser = await userModel.create(user); 
            console.log("User successfully created:", createdUser); 
            return createdUser as Iuser | any 
        } catch (error) {
            console.error("Error while creating user:", error); 
            throw error
        }
    }
    
    async findUserByEmail(email:string) {
        try {
            
            const userDetail= await userModel.findOne({emailAddress:email}) 
            return userDetail;  
            
        } catch (error:any) {
            console.log(error.message)
            
        }
        
}
}