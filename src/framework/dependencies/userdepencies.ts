
import UserUseCase from "../../usecases/userServices.ts"
import { MongoUserRepository } from "../database/repositories/userRepository.ts"
import { UserController } from "../../adapters/controller/userController.ts"
import { PasswordService } from "../web/utils/passwordService.ts"
import { JwtService } from "../web/utils/JwtService.ts"
import { GenerteOtp } from "../web/utils/generateOtp.ts"
import { MongoOtpRepository } from "../database/repositories/otpRepository.ts"
import { EmailService } from "../web/utils/emailService.ts"




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

