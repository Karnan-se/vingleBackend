
import TutorUseCase from "../../../usecases/tuotorService";
import TutorMongoRepository from "../../database/repositories/tutorRepository";
import { JwtService } from "../../web/utils/JwtService";
import { PasswordService } from "../../web/utils/passwordService";
import TutorController from "../../../adapters/controller/tutorController";
import { GenerteOtp } from "../../web/utils/generateOtp";
import { MongoOtpRepository } from "../../database/repositories/otpRepository";
import { EmailService } from "../../web/utils/emailService";


  const  repository ={
        tutorRepository : new TutorMongoRepository(),
         MongoOTPRepository: new MongoOtpRepository()
         
    }

const service ={
    JwtService : new JwtService(),
    passwordService: new PasswordService(),
     generateOtp :  new GenerteOtp(),
     EmailService: new EmailService()
}

const tutorUseCase = new TutorUseCase({repository, service})

export const tutorController = new TutorController(tutorUseCase)
