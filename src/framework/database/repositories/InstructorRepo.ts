import { InstructorModel } from "../models/tutor/InstructorModel.ts";
import { IInstructorRepoInterface } from "../../../entitties/interfaces/tutor.ts/IInstructorRepo.ts";
import { IInstructor } from "../../../entitties/interfaces/tutor.ts/IInstructor.ts";
import { ObjectId } from "mongoose";
import AppError from "../../web/utils/appError.ts";
import { error } from "console";


export default class InstructorRepository implements IInstructorRepoInterface  {
    
    
        async createUser(user: IInstructor): Promise<IInstructor | null> {
            console.log(user, "Received User Data"); 
        
            try {
                const createdTutor = await InstructorModel.create(user); 
                console.log("User successfully created:", createdTutor); 
                return createdTutor as IInstructor | any 
            } catch (error) {
                console.error("Error while creating user:", error); 
                throw error
            }
        }
        async  findByUserId(userId: ObjectId | undefined): Promise<IInstructor> {
            try {
                const tutorDetail = await InstructorModel.findOne({user_id : userId})
                console.log(tutorDetail)
                if(!tutorDetail){
                    throw AppError.conflict("no application available")
                }
                return tutorDetail as unknown as IInstructor
                
            } catch (error) {
                console.log(error)
                throw error;
                
            }
              
        }
        async findById(_id: ObjectId | undefined): Promise<IInstructor> {
            try {
                const applicationDetails = await InstructorModel.findById({_id})
                return applicationDetails as IInstructor
                
            } catch (error) {
                console.log(error);
                throw error
            }
            
        }
        async update(applicationDetail:IInstructor| undefined):Promise<IInstructor>{
            try {
                const updatedApp = await InstructorModel.findOneAndUpdate(
                    { _id: applicationDetail?._id },
                    { $set: { ...applicationDetail } },
                    { new: true } 
                  );
                return updatedApp as IInstructor
                
                
            } catch (error) {
                console.log(error)
                throw error
                
            }
        }
      
    }