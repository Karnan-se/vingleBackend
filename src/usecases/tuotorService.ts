import { attachTokenCookie } from "../adapters/middleware/cookie"
import IJwtService from "../entitties/interfaces/service.ts/IJwtService"
import IpasswordService from "../entitties/interfaces/service.ts/passwordService"
import Itutor from "../entitties/interfaces/tutor.ts/Itutor"
import { ItutorRepository } from "../entitties/interfaces/tutor.ts/tutorrepository"
import AppError from "../framework/web/utils/appError.ts"


interface Dependency {
    repository :{
        tutorRepository : ItutorRepository
    },
    service :{
        JwtService : IJwtService
        passwordService: IpasswordService
    }

}
type SignUpResponse = {
    TutorCreate: Itutor | null
    accessToken: string 
    refreshToken: string 
  };


export default  class TutorUseCase{
    private tutorRepository
    private jwtService
    private passwordService
    constructor(dependency:Dependency){
        this.tutorRepository = dependency.repository.tutorRepository
        this.jwtService = dependency.service.JwtService
        this.passwordService = dependency.service.passwordService
    }
    async SignUp(user:Itutor): Promise<{ TutorCreate: Itutor; accessToken: string; refreshToken: string }>{
       try {
        const ExistingTutor = await this.tutorRepository.findByEmail(user.emailAddress);
        if(ExistingTutor){
            throw AppError.conflict("Tutor already Registered ")
        }
        user.password = await this.passwordService.passwordHash(user.password);
      
        const TutorCreate = await this.tutorRepository.createTutor(user)
        const accessToken = this.jwtService.generateAccesSToken(TutorCreate._id);
        if(!accessToken) throw AppError.conflict("couldnot Generate Token");
        const refreshToken  = this.jwtService.generateRefreshToken(TutorCreate._id);
        if(!refreshToken)  throw AppError.conflict("couldnot generate refresh Token");
        return {
            TutorCreate ,
            refreshToken, 
            accessToken
        }
        
       } catch (error) {
        console.log(error)
        throw error
        
       } 
       
    }
    async SignIn(email:string, password:string){
        const tutor = await this.tutorRepository.findByEmail(email);
        if(!tutor) throw AppError.conflict("User Not registered")
            const isMatching = await this.passwordService.comparepassword(password, tutor.password)
        if(!isMatching) throw AppError.conflict("Password Not Matching");
        const accessToken = this.jwtService.generateAccesSToken(tutor._id);
        if(!accessToken) throw AppError.conflict("couldnot Generate Token");
        const refreshToken  = this.jwtService.generateRefreshToken(tutor._id);
        if(!refreshToken)  throw AppError.conflict("couldnot generate refresh Token");
        return  {
            tutor,
            accessToken,
            refreshToken
        }
        

}

}