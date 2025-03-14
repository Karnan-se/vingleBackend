import { ObjectId } from "mongoose";
import EmailService from "../entitties/interfaces/common/emailservice.ts";
import { IInstructorRepoInterface } from "../entitties/interfaces/tutor.ts/IInstructorRepo.ts";
import { IuserRepository } from "../entitties/interfaces/user/userrepository.ts";
import AppError from "../framework/web/utils/appError.ts";
import { Iuser } from "../entitties/interfaces/user/user.ts";
import IGenerateTutorPassword from "../entitties/interfaces/tutor.ts/IGenerateTutorPassword.ts";
import { ItutorRepository } from "../entitties/interfaces/tutor.ts/tutorrepository.ts";
import IpasswordService from "../entitties/interfaces/service.ts/passwordService.ts";
import Itutor from "../entitties/interfaces/tutor.ts/Itutor.ts";


interface Dependency{
    repository:{
        InstructorRepo :IInstructorRepoInterface,
        userRepository:IuserRepository,
        tutorRepository:ItutorRepository
        
    },
    service:{
        emailService : EmailService,
        generatePassword:IGenerateTutorPassword
        passwordService:IpasswordService
    }
  
}



export default class AdminApplicationService{
    private InstructorRepo
    private userRepository
    private emailService
    private generatedPassword
    private passwordService
    private tutorRepository
    constructor(dependency:Dependency){
        this.InstructorRepo = dependency.repository.InstructorRepo
        this.userRepository = dependency.repository.userRepository
        this.emailService  = dependency.service.emailService
        this.generatedPassword = dependency.service.generatePassword
        this.passwordService = dependency.service.passwordService
        this.tutorRepository = dependency.repository.tutorRepository
    }
    async viewApplication(_id:ObjectId){
        try {
            const response= await this.InstructorRepo.findByUserId(_id)
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

    async approveApplication(_id:ObjectId, user_id:ObjectId){
        try {
            const userDetails = await this.userRepository.findUserById(user_id);
            if(!userDetails) throw AppError.conflict("Error  getting userDetails");
            userDetails.isInstructor = "Accepted";
            const saveUserDetails = await this.userRepository.UpdateUser(userDetails);
            if(saveUserDetails){
                this.sendApproval(userDetails)
            }
            if(!saveUserDetails){
                console.log("userDetails saving Error")
            }
            const applicationDetails = await this.InstructorRepo.findById(_id);
            applicationDetails.status ="accepted"
            const updateApplication = await this.InstructorRepo.update(applicationDetails)
            return updateApplication   
        } catch (error) {
            throw error
            
        }
    }
    async rejectApplication(_id:ObjectId, user_id:ObjectId , rejectApplication:string[] | undefined){
        try {
            const userDetails= await this.userRepository.findUserById(user_id);
            if(!userDetails) throw AppError.conflict("Error getting userDetails");
            userDetails.isInstructor = "Rejected";
            if(rejectApplication && userDetails){
                this.sendRejectionMail(userDetails.emailAddress, rejectApplication )
            }
            const saveUserDetails = await this.userRepository.UpdateUser(userDetails);
            if(!saveUserDetails){
                console.log("userDetails saving Error")
                
            }
            console.log(saveUserDetails, "userDetails ... ... . .. . . ..")
            const applicationDetails = await this.InstructorRepo.findById(_id);
            applicationDetails.status ="rejected"
            const updateApplication = await this.InstructorRepo.update(applicationDetails)

            return updateApplication;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
    async sendRejectionMail(email:string, rejectApplication:string[]){
        try {
            const sendMail = await this.emailService.sendRejectionMail(email, rejectApplication).then(()=>console.log("mail sent"))   
        } catch (error) {
            throw AppError.conflict("Error sending the Mail ")
            
        }

       
    }
    async sendApproval(userDetails:Iuser){
        try {
            const password = await this.generatedPassword.Password();
            console.log(password);
            const hashedPassword = await this.passwordService.passwordHash(password as unknown as string);
            const tutorDetails:Itutor ={
                firstName:userDetails.firstName || "",
                country:userDetails.country || "",
                password:hashedPassword,
                emailAddress:userDetails.emailAddress,
                photo:userDetails.photo || "",
                lastName:userDetails.lastName || " "
            }
            const update = await this.tutorRepository.createTutor(tutorDetails);
            if(!update){
                throw AppError.conflict("user_validation Error")
            }
            const sendEmail = await this.emailService.sendApproval(userDetails.emailAddress, password).then(()=>console.log("it has been saved"))
    
        } catch (error) {
            console.log(error);
            throw AppError.conflict("error sending mail Addresss")
            
        }
    }
    async rejectCourse(rejectionDetails : any, tutorId:ObjectId){
     try {
        const tutor = await this.tutorRepository.findById(tutorId)
        console.log(tutorId , "tutorId")
        const sendMail = await this.emailService.sendRejectionMail(tutor.emailAddress as string, rejectionDetails).then(()=> console.log("email is send"))
        return tutor
        
     } catch (error) {
        console.log(error)
        throw error
        
     }

    }
}