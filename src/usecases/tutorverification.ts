
import { IOTP } from "../entitties/interfaces/admin/Iotp"
import IOTPRepository from "../entitties/interfaces/common/IOTPRepository"
import AppError from "../framework/web/utils/appError"
import IEmailService from "../entitties/interfaces/common/emailservice"
import IGenerateOtp from "../entitties/interfaces/admin/IGenerateOtp"
import { ItutorRepository } from "../entitties/interfaces/tutor.ts/tutorrepository"
import Itutor from "../entitties/interfaces/tutor.ts/Itutor"



interface Dependency{
    repository :{
        otprepository:IOTPRepository
        tutorRepository:ItutorRepository
    }
    service :{
        generateOtp : IGenerateOtp
        EmailService:IEmailService
    }
}



export default class TutorVerifivationService{
    private  OTP 
    private EmailService
    private generateOTP 
    private tutorRepository
    constructor(dependency:Dependency) {
        this.OTP = dependency.repository.otprepository  
        this.EmailService = dependency.service.EmailService
        this.generateOTP = dependency.service.generateOtp.generate
        this.tutorRepository = dependency.repository.tutorRepository
    }
    async resendOTP(email:string,){
    const generateOTP =  this.generateOTP();
    
    if(!generateOTP) throw AppError.conflict("OTP CREATION FAiled")
    const otpData :IOTP ={
        email : email,
        otp:generateOTP
    }
    
    const createOTP =  await this.OTP.createOTP(otpData);
    if(!createOTP){
        throw AppError.conflict("OTP NOT SAVED")
    }
    
    const sendOTp = await this.EmailService.sendVerificationEmail(email,generateOTP ).catch((error)=>{
        throw AppError.conflict("Error sending the E-mail")
    })
    return "OTP SEND"
    
}

    async VerifyOTP(userDetail:Itutor , otp:string){
        const savedOTP = await this.OTP.findOTPbyEmail(userDetail.emailAddress, otp)
        if(!savedOTP){
            throw AppError.conflict("ERROR OTP NOT FOUND")
        }
        const userDetails = await this.tutorRepository.findByEmail(userDetail.emailAddress);
        if(!userDetails){
            throw AppError.conflict("REGISTRATION FAILED")
        }
        userDetail.isVerified = true;
        const updateUser = await this.tutorRepository.UpdateUser(userDetail)
        if(!updateUser) throw AppError.conflict("Error updating the useDetails")
            return userDetail;
    }
}