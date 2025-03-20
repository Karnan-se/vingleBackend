
import UserUseCase from "../../usecases/userServices"
import { MongoUserRepository } from "../database/repositories/userRepository"
import { UserController } from "../../adapters/controller/userController"
import { PasswordService } from "../web/utils/passwordService"
import { JwtService } from "../web/utils/JwtService"
import { GenerteOtp } from "../web/utils/generateOtp"
import { MongoOtpRepository } from "../database/repositories/otpRepository"
import { EmailService } from "../web/utils/emailService"




const repository ={
  userRepository: new MongoUserRepository(),
  MongoOTPRepository: new MongoOtpRepository(), 

}
const services ={
  passwordService: new PasswordService(),
  JwtService: new JwtService(),
  generateOtp : new GenerteOtp(),
  EmailService: new EmailService()
}


const userUseCase ={
  userUseCase: new UserUseCase({repositories:repository, services})
}

const userController = new UserController(userUseCase.userUseCase)

export {userController}
const userUseCaseInstance = userUseCase.userUseCase;
export {userUseCaseInstance}

