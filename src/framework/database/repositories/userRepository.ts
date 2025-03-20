import { userModel } from "../models/user/userModels";  //this part is from mongo modal
import { IuserRepository } from "../../../entitties/interfaces/user/userrepository";
import { Iuser } from "../../../entitties/interfaces/user/user";
import AppError from "../../web/utils/appError";
import { ObjectId } from "mongoose";


export class MongoUserRepository implements IuserRepository{

    async createUser(user: any): Promise<Iuser> {
        console.log(user, "Received User Data"); 
    
        try {

            const createdUser = await userModel.create(user); 
            console.log("User successfully created:", createdUser); 
            return createdUser as unknown as Iuser 
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
           return saved as unknown as Iuser
     
        } catch (error) {
            console.log(error)
            throw error
            
        }
    }

    async findUserById(userId:string | ObjectId){
        try {
            let userDetails = await userModel.findOne({_id:userId})
            if(!userDetails){
                throw AppError.conflict("user Details not Found");
            }
            return userDetails as unknown as Iuser
            
        } catch (error) {
            console.log(error);
            throw error;
            
        }
    }
    async findAlluser(){
        try {
            let userDetails = await userModel.find({}, { password: 0 }).sort({ _id: -1 });
            // console.log(userDetails)
            if(!userDetails){
                throw AppError.conflict("no users")
            }
            return userDetails as unknown as Iuser
            
        } catch (error) {
            console.log(error);
            throw error;
            
        }
    }
}