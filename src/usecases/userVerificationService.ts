import { IOTP } from "../entitties/interfaces/admin/Iotp"
import IOTPRepository from "../entitties/interfaces/common/IOTPRepository"
import AppError from "../framework/web/utils/appError"
import IEmailService from "../entitties/interfaces/common/emailservice"
import IGenerateOtp from "../entitties/interfaces/admin/IGenerateOtp"
import { Iuser } from "../entitties/interfaces/user/user"
import { IuserRepository } from "../entitties/interfaces/user/userrepository"

interface Dependency{
    repository :{
        otprepository:IOTPRepository
        userRepository :IuserRepository
        
    }
    service :{
        generateOtp : IGenerateOtp
        EmailService:IEmailService
    }
}



export default class VerificationService{
    private  OTP 
    private EmailService
    private generateOTP 
    private userRepository
    constructor(dependency:Dependency) {
        this.OTP = dependency.repository.otprepository  
        this.EmailService = dependency.service.EmailService
        this.generateOTP = dependency.service.generateOtp.generate
        this.userRepository = dependency.repository.userRepository
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

    async VerifyOTP(userDetail:Iuser , otp:string){
        const savedOTP = await this.OTP.findOTPbyEmail(userDetail.emailAddress, otp);
        console.log(savedOTP, "SavedOTP")
        if(!savedOTP){
            throw AppError.conflict("Inavalid OTP")
        }
        const userDetails = await this.userRepository.findUserByEmail(userDetail.emailAddress);
        if(!userDetails){
            throw AppError.conflict("REGISTRATION FAILED")
        }
        userDetail.isVerfied = true;
        const updateUser = await this.userRepository.UpdateUser(userDetail)
        if(!updateUser) throw AppError.conflict("Error updating the useDetails")
            return userDetail;
    }



}