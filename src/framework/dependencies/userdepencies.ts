
import UserUseCase from "../../usecases/userServices.ts"
import { MongoUserRepository } from "../database/repositories/userRepository.ts"
import { UserController } from "../../adapters/controller/userController.ts"
import { PasswordService } from "../web/utils/passwordService.ts"
import { JwtService } from "../web/utils/JwtService.ts"




const repository ={
  userRepository: new MongoUserRepository(),

}
const services ={
  passwordService: new PasswordService(),
  JwtService: new JwtService()
}


const userUseCase ={
  userUseCase: new UserUseCase({repositories:repository, services})
}

const userController = new UserController(userUseCase.userUseCase)

export {userController}

