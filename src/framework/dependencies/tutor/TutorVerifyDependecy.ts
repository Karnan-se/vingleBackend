
import TutorVerifivationService from "../../../usecases/tutorverification.ts";

import { MongoOtpRepository } from "../../database/repositories/otpRepository.ts";
import { EmailService } from "../../web/utils/emailService.ts";
import { GenerteOtp } from "../../web/utils/generateOtp.ts";

import TutorVerifyController from "../../../adapters/controller/tutorVerifyController.ts";
import TutorMongoRepository from "../../database/repositories/tutorRepository.ts";

const repository ={
    otprepository: new MongoOtpRepository(),
    tutorRepository: new TutorMongoRepository()
}

const service = {
    generateOtp : new GenerteOtp(),
    EmailService :new EmailService()
}



const verfication  = new TutorVerifivationService({repository, service})

const  tutorVerifyController = new TutorVerifyController(verfication) 

export default tutorVerifyController