import { IuserRepository } from "../entitties/interfaces/user/userrepository.ts";
import { Iuser } from "../entitties/interfaces/user/user.ts";
import IpasswordService from "../entitties/interfaces/service.ts/passwordService.ts";
import AppError from "../framework/web/utils/appError.ts";
import JwtService from "../entitties/interfaces/service.ts/IJwtService.ts";
import IGenerateOtp from "../entitties/interfaces/admin/IGenerateOtp.ts";
import OTPRepository from "../entitties/interfaces/common/IOTPRepository.ts";
import EmailService from "../entitties/interfaces/common/emailservice.ts";
import { IOTP } from "../entitties/interfaces/admin/Iotp.ts";
import { ObjectId } from "mongoose";


interface Dependencies {
  repositories: {
    userRepository: IuserRepository
    MongoOTPRepository:OTPRepository

  };
  services: {
    passwordService: IpasswordService;
    JwtService:JwtService,
    generateOtp: IGenerateOtp,
    EmailService:EmailService
    
  };
}

export default class userUseCase {
  private userRepository: IuserRepository;
  private passwordService: IpasswordService;
  private jwtService : JwtService
  private generateOtp :IGenerateOtp
  private MongoOTPRepository :OTPRepository
  private EmailService:EmailService


  

  constructor(dependencies: Dependencies) {
    this.userRepository = dependencies.repositories.userRepository;
    this.passwordService = dependencies.services.passwordService;
    this.jwtService = dependencies.services.JwtService
    this.generateOtp = dependencies.services.generateOtp
    this.MongoOTPRepository = dependencies.repositories.MongoOTPRepository
    this.EmailService = dependencies.services.EmailService
  }
  async signup(user: Iuser) {
    const existingUser = await this.userRepository.findUserByEmail(
      user.emailAddress
    );

    if (existingUser) {
      throw AppError.conflict("user Already exists");
    }
    user.password = await this.passwordService.passwordHash(user.password);
    const verificationOTP = this.generateOtp.generate();
    if(!verificationOTP) throw AppError.conflict("couldnot generate otp")

    const createOtp = await this.MongoOTPRepository.createOTP({email:user.emailAddress, otp:verificationOTP});
    if(!createOtp)throw AppError.conflict("Error storing OTP in database");
    const sendOtp = await this.EmailService.sendVerificationEmail(createOtp.email,createOtp.otp);
    const createdUser = await this.userRepository.createUser(user);
    console.log(createdUser);
    const accessToken = this.jwtService.generateAccesSToken(createdUser._id , "User")
    if(!accessToken){
      console.log("couldnot generate")
    }
    const refreshToken = this.jwtService.generateRefreshToken(createdUser._id ,  "User")
    if(!refreshToken){
      console.log("refresg")
    }
    return {createdUser, accessToken, refreshToken}
      
  }

  async verifyOtp(email:string, otp:string){
    const otpData:IOTP = {
      email:email,
      otp:otp
    }

    const createOtp = await this.MongoOTPRepository.createOTP(otpData)
    if(!createOtp){
      throw AppError.conflict("Error creating the Otp")
    }
    try {
      const sendOtp =await this.EmailService.sendVerificationEmail(email, otp)
      
    } catch (error:Error|any) {
      throw AppError.conflict(error.message)
      
    }
  
    

  }

  async signIn(user: Iuser) {

    const existingUser = await this.userRepository.findUserByEmail(user.emailAddress);

    if (!existingUser) throw AppError.conflict("emailAddress not registered");

    const isPasswordMatching = await this.passwordService.comparepassword(user.password,existingUser.password);
    if  (!isPasswordMatching) throw AppError.authentication("InValid Password");
    if(existingUser.isBlocked) throw AppError.forbidden("user is blocked")
      const accessToken = this.jwtService.generateAccesSToken(existingUser._id , "User")
    if(!accessToken)throw AppError.conflict("couldnot Generate JWT-TOken")
    const refreshToken = this.jwtService.generateRefreshToken(existingUser._id, "User")
    return {
      existingUser,
      accessToken,
      refreshToken
    }
  }
  async UpdateUser(user:Iuser) {
    const existingUser = await this.userRepository.findUserByEmail(user.emailAddress);
    if(!existingUser) throw AppError.conflict("email_id is not registered")
      const updatedUser = await this.userRepository.UpdateUser(user)
    
     return updatedUser

  }

  async sendOTP(email:string | undefined){
    try {
      const existinguser = await this.userRepository.findUserByEmail(email)
      if(!existinguser) throw AppError.conflict("email_id is not registered");
      const OTP:string =  this.generateOtp.generate();
      if(!OTP)throw AppError.conflict("Errro creating the OTP");
      const saveOTP = await this.MongoOTPRepository.createOTP({email:email, otp:OTP})
      if(!saveOTP) throw AppError.conflict("Error savving in Database");
      const sendOTP = await this.EmailService.sendVerificationEmail(email, OTP).catch((error)=> {throw AppError.conflict("Error sending")})
      return existinguser;
  
    } catch (error:any) {
      throw AppError.conflict(error.message)
      
    }

  }

 

  async changePassword(email:string, password:string){
    try {
      console.log(email, password,  "email and password from userService")
      const userDetail = await this.userRepository.findUserByEmail(email);
      if(!userDetail) throw AppError.conflict("Error finding The User");
      const hashedPassword = await this.passwordService.passwordHash(password)
      userDetail.password = hashedPassword;
      const updateUser = this.userRepository.UpdateUser(userDetail);
      if(!updateUser) throw AppError.conflict("Error updating The UserDetails")
          return updateUser
      
    } catch (error) {
      console.log(error)
      throw AppError.conflict("Error changing the password")
      
    }
  
}
async findUserById(userId:ObjectId){
  const userDetails = await this.userRepository.findUserById(userId)
  // console.log(userDetails , "UserDetails  dbwekdbj")
  return userDetails 
}


}
