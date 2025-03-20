import GoogleSignService from "../../../usecases/googleSignIn";
import { MongoUserRepository } from "../../database/repositories/userRepository";
import { userUseCaseInstance } from "../userdepencies";

import GoogleService from "../../web/utils/googleService";
import GoogleController from "../../../adapters/controller/googleSignCon";


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

