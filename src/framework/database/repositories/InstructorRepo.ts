import { InstructorModel } from "../models/tutor/InstructorModel.ts";
import { IInstructorRepoInterface } from "../../../entitties/interfaces/tutor.ts/IInstructorRepo.ts";
import { IInstructor } from "../../../entitties/interfaces/tutor.ts/IInstructor.ts";
import { ObjectId } from "mongoose";


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
            const tutorDetail = await InstructorModel.findOne({user_id : userId})
            return tutorDetail as unknown as IInstructor
            
        }
      
    }