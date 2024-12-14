import GoogleSignService from "../../../usecases/googleSignIn.ts";
import { MongoUserRepository } from "../../database/repositories/userRepository.ts";
import { userUseCaseInstance } from "../userdepencies.ts";

import GoogleService from "../../web/utils/googleService.ts";
import GoogleController from "../../../adapters/controller/googleSignCon.ts";


const repository ={
    userRepository: new MongoUserRepository(),

}
const service  ={
    googleService: new GoogleService()

}
const googleSignService = new GoogleSignService({repository, service});



const useRepository = repository.userRepository

const googleController = new GoogleController({googleSignService , userUseCaseInstance , useRepository  }); 

export {googleController}

