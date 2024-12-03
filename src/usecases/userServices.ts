import { IuserRepository } from "../entitties/interfaces/user/userrepository.ts";
import { Iuser } from "../entitties/interfaces/user/user.ts";
import IpasswordService from "../entitties/interfaces/service.ts/passwordService.ts";
import AppError from "../framework/web/utils/appError.ts";
import JwtService from "../entitties/interfaces/service.ts/IJwtService.ts";


interface Dependencies {
  repositories: {
    userRepository: IuserRepository;
  };
  services: {
    passwordService: IpasswordService;
    JwtService:JwtService
  };
}

export default class userUseCase {
  private userRepository: IuserRepository;
  private passwordService: IpasswordService;
  private jwtService : JwtService
  

  constructor(dependencies: Dependencies) {
    this.userRepository = dependencies.repositories.userRepository;
    this.passwordService = dependencies.services.passwordService;
    this.jwtService = dependencies.services.JwtService
  }
  async signup(user: Iuser) {
    const existingUser = await this.userRepository.findUserByEmail(
      user.emailAddress
    );

    if (existingUser) {
      throw AppError.conflict("user Already exists");
    }
    user.password = await this.passwordService.passwordHash(user.password);
    const createdUser = await this.userRepository.createUser(user);
    console.log(createdUser);
    return createdUser;
  }
  async signIn(user: Iuser) {

    const existingUser = await this.userRepository.findUserByEmail(user.emailAddress);

    if (!existingUser) throw AppError.conflict("emailAddress not registered");

    const isPasswordMatching = await this.passwordService.comparepassword(user.password,existingUser.password);
    if  (!isPasswordMatching) throw AppError.authentication("InValid Password");
    if(existingUser.isBlocked) throw AppError.forbidden("user is blocked")
      const accessToken = this.jwtService.generateAccesSToken(existingUser._id)
    if(!accessToken)throw AppError.conflict("couldnot Generate JWT-TOken")
    const refreshToken = this.jwtService.generateRefreshToken(existingUser._id)
    return {
      existingUser,
      accessToken,
      refreshToken
    }
  }
}
