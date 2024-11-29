
import UserUseCase from "../../usecases/userServices.ts"
import { MongoUserRepository } from "../database/repositories/userRepository.ts"
import { UserController } from "../../adapters/controller/userController.ts"
import { PasswordService } from "../web/utils/passwordService.ts"




const repository ={
  userRepository: new MongoUserRepository(),

}
const services ={
  passwordService: new PasswordService()
  
  
}


const userUseCase ={
  userUseCase: new UserUseCase({repositories:repository, services})
}

const userController = new UserController(userUseCase.userUseCase)

export {userController}

