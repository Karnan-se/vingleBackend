import { ObjectId } from "mongoose";
import EmailService from "../entitties/interfaces/common/emailservice";
import { IInstructor } from "../entitties/interfaces/tutor.ts/IInstructor";
import { IInstructorRepoInterface } from "../entitties/interfaces/tutor.ts/IInstructorRepo";
import { IuserRepository } from "../entitties/interfaces/user/userrepository";
import AppError from "../framework/web/utils/appError";

interface Dependency{
    repository:{
        InstructorRepo :IInstructorRepoInterface,
        userRepository:IuserRepository
    },
    service:{
        emailService : EmailService
    }
  
}



export default class AdminApplicationService{
    private InstructorRepo
    private userRepository
    constructor(dependency:Dependency){
        this.InstructorRepo = dependency.repository.InstructorRepo,
        this.userRepository = dependency.repository.userRepository
    }
    async viewApplication(_id:ObjectId){
        try {
            const response= await this.InstructorRepo.findByUserId(_id);
            console.log(response)
            if(!response){
                throw AppError.conflict("no tutor Details")
            }
            return response;
            
        } catch (error) {
            console.log(error);
            throw error
            

            
        }
    }
}