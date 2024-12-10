import VerificationService from "../../usecases/userVerificationService.ts";
import { MongoOtpRepository } from "../database/repositories/otpRepository.ts";
import { MongoUserRepository } from "../database/repositories/userRepository.ts";
import { EmailService } from "../web/utils/emailService.ts";
import { GenerteOtp } from "../web/utils/generateOtp.ts";
import VerificationController from "../../adapters/controller/userVerifyController.ts";

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