import { userModel } from "../models/user/userModels.ts";  //this part is from mongo modal
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
            return userDetail as any;  
            
        } catch (error:any) {
            console.log(error.message)
            
        }      
        
}
    async UpdateUser(user:Iuser){
        try {
           let userDetails  =  await this.findUserByEmail(user.emailAddress);
           if(!userDetails){
            throw AppError.conflict("user Details not found")
           }
           Object.assign(userDetails, user);
           const saved =await userDetails.save()
           return saved;
     
        } catch (error) {
            console.log(error)
            throw error
            
        }
    }
}