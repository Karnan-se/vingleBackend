import VerificationService from "../../usecases/userVerificationService";
import { MongoOtpRepository } from "../database/repositories/otpRepository";
import { MongoUserRepository } from "../database/repositories/userRepository";
import { EmailService } from "../web/utils/emailService";
import { GenerteOtp } from "../web/utils/generateOtp";
import VerificationController from "../../adapters/controller/userVerifyController";

const repository ={
    otprepository: new MongoOtpRepository(),
    userRepository :new MongoUserRepository()
}

const service = {
    generateOtp : new GenerteOtp(),
    EmailService :new EmailService()
}



const verfication  = new VerificationService({repository, service})



const  verificationController = new VerificationController({verfication}) 

export default verificationController