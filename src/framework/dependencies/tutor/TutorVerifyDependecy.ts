
import TutorVerifivationService from "../../../usecases/tutorverification";

import { MongoOtpRepository } from "../../database/repositories/otpRepository";
import { EmailService } from "../../web/utils/emailService";
import { GenerteOtp } from "../../web/utils/generateOtp";

import TutorVerifyController from "../../../adapters/controller/tutorVerifyController";
import TutorMongoRepository from "../../database/repositories/tutorRepository";

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