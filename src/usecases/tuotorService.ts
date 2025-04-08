
import IJwtService from "../entitties/interfaces/service.ts/IJwtService"
import IpasswordService from "../entitties/interfaces/service.ts/passwordService"
import Itutor from "../entitties/interfaces/tutor.ts/Itutor"
import { ItutorRepository } from "../entitties/interfaces/tutor.ts/tutorrepository"
import AppError from "../framework/web/utils/appError"
import IGenerateOtp from "../entitties/interfaces/admin/IGenerateOtp"
import OTPRepository from "../entitties/interfaces/common/IOTPRepository"
import EmailService from "../entitties/interfaces/common/emailservice"


interface Dependency {
    repository :{
        tutorRepository : ItutorRepository
         MongoOTPRepository:OTPRepository
    },
    service :{
        JwtService : IJwtService
        passwordService: IpasswordService
        generateOtp :IGenerateOtp
        EmailService:EmailService
    }

}


export default  class TutorUseCase{
    private tutorRepository
    private jwtService
    private passwordService
    private generateOtp
    private MongoOTPRepository
    private EmailService
    constructor(dependency:Dependency){
        this.tutorRepository = dependency.repository.tutorRepository
        this.jwtService = dependency.service.JwtService
        this.passwordService = dependency.service.passwordService
        this.generateOtp = dependency.service.generateOtp;
        this.MongoOTPRepository= dependency.repository.MongoOTPRepository
        this.EmailService = dependency.service.EmailService

    }
    async SignUp(user:Itutor): Promise<{ TutorCreate: Itutor; accessToken: string; refreshToken: string }>{
       try {
        const ExistingTutor = await this.tutorRepository.findByEmail(user.emailAddress);
        if(ExistingTutor){
            throw AppError.conflict("Tutor already Registered ")
        }
        user.password = await this.passwordService.passwordHash(user.password);
      
        const TutorCreate = await this.tutorRepository.createTutor(user)
        const accessToken = this.jwtService.generateAccesSToken(TutorCreate._id , "Tutor");
        if(!accessToken) throw AppError.conflict("couldnot Generate Token");
        const refreshToken  = this.jwtService.generateRefreshToken(TutorCreate._id , "Tutor");
        if(!refreshToken)  throw AppError.conflict("couldnot generate refresh Token");
        return {
            TutorCreate ,
            refreshToken, 
            accessToken
        }
        
       } catch (error) {
        console.log(error)
        throw error
        
       } 
       
    }
    async SignIn(email:string, password:string){
        const tutor = await this.tutorRepository.findByEmail(email);
        if(!tutor) throw AppError.conflict("User Not registered")
            const isMatching = await this.passwordService.comparepassword(password, tutor.password)
        if(!isMatching) throw AppError.conflict("Password Not Matching");
        const accessToken = this.jwtService.generateAccesSToken(tutor._id , "Tutor");
        if(!accessToken) throw AppError.conflict("couldnot Generate Token");
        const refreshToken  = this.jwtService.generateRefreshToken(tutor._id , "Tutor");
        if(!refreshToken)  throw AppError.conflict("couldnot generate refresh Token");
        return  {
            tutor,
            accessToken,
            refreshToken
        }
        

}
async updatedUser(tutor:Itutor){

    try {
        const updateTutor = await this.tutorRepository.UpdateUser(tutor);
        return updateTutor
        
    } catch (error) {
        console.log(error)
        throw error
        
    }
  
}
async getAllTutors(){
    try {
        const tutors = await this.tutorRepository.getAllTutors()
        return tutors
        
    } catch (error) {
        console.log(error)
        throw error
        
    }
}
async fetchTutorByEmail(emailAddress:string[]){
    try {
        const tutors = await this.tutorRepository.fetchTutorByEmail(emailAddress)
        return tutors
        
    } catch (error) {
        console.log(error)
        throw error
        
    }
}
async sendOTP(email:string){
    try {
        const existingUser = await this.tutorRepository.findByEmail(email)
        if(!existingUser){
            throw AppError.conflict("User not registered")
        }
        const OTP:string =  this.generateOtp.generate();
        if(!OTP) throw AppError.conflict("Error creating OTP")
        const saveOTP = await this.MongoOTPRepository.createOTP({email:email, otp:OTP})
        if(!saveOTP) throw AppError.conflict("Error saving OTP in Database");
        const sendOTP = await this.EmailService.sendVerificationEmail(email, OTP)
        .catch((error)=> {throw AppError.conflict("Error sending OTP")})
        return existingUser;  
        
    } catch (error) {
        console.log(error)
        throw error
        
    }

}

async verifyOTP(email:string, otp:string){

try {
    const savedOtp = await this.MongoOTPRepository.findOTPbyEmail(email, otp)
    console.log("we got tutors OTP", savedOtp)
    return savedOtp;

    
} catch (error) {
    console.log(error)
    throw error
    
}
}

async changePassword(email:string, password:string){
    try {
        const existingUser = await this.tutorRepository.findByEmail(email)
        if(!existingUser) throw AppError.conflict("User not registered")
        const hashedPassword = await this.passwordService.passwordHash(password)
        existingUser.password = hashedPassword
        const updatedUser = await this.tutorRepository.UpdateUser(existingUser)
        return updatedUser
        
    } catch (error) {
        console.log(error)
        throw error
        
    }
}


}