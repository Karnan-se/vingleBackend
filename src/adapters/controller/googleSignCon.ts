import IGoogleSignService from "../../usecases/googleSignIn";
import { Request, Response, NextFunction } from "express";
import { Iuser } from "../../entitties/interfaces/user/user";
import { IUserUseCase } from "../../entitties/interfaces/user/userUseCase";
import { MongoUserRepository } from "../../framework/database/repositories/userRepository";
import { HttpStatus } from "../../entitties/Enums/statusCode";
import { GooglePayload } from "../../entitties/interfaces/service.ts/googleService";
import { attachTokenCookie } from "../middleware/cookie";

interface usecase {
  googleSignService: IGoogleSignService;
  userUseCaseInstance: IUserUseCase;
  useRepository: MongoUserRepository;
}

export default class GoogleController {
  private GoogleUsecase;
  private userUseCase;
  private useRepository;

  constructor(usecase: usecase) {
    this.GoogleUsecase = usecase.googleSignService;
    this.userUseCase = usecase.userUseCaseInstance;
    this.useRepository = usecase.useRepository;
  }
  async signIn(req: Request, res: Response, next: NextFunction) {
    const { token } = req.body;
    try {
      const googleInfo: GooglePayload | any =
        await this.GoogleUsecase.GoogleSignIn(token);
      const { email, email_verified, picture, family_name, given_name } =
        googleInfo;

      const userDetails = {
        emailAddress: email,
        isVerfied: email_verified,
        photo: picture,
        lastName: family_name,
        firstName: given_name,
        country: "IN",
        password: "",
      };
      try {
        const { createdUser, accessToken, refreshToken } = await this.userUseCase.signup(userDetails as Iuser);
        attachTokenCookie("AccessToken", accessToken, res);
        attachTokenCookie("RefreshToken", refreshToken, res);

        if (createdUser) {
          res
            .status(HttpStatus.OK)
            .json({ message: "success", data: createdUser });
        }
      } catch (error) {
        console.log(error);
        if (error) {
          const userDetail = await this.useRepository.findUserByEmail(
            userDetails.emailAddress
          );
          const {accessToken , refreshToken }= await this.userUseCase.generateJwtToken(userDetail._id , "User")
          console.log(accessToken ,   "accessToken" ,"\n" ,  refreshToken)
          attachTokenCookie("AccessToken", accessToken, res);
          attachTokenCookie("RefreshToken", refreshToken, res);
          res .status(HttpStatus.OK).json({ message: "success", data: userDetail });
        }
      }
    } catch (error) {
      next(error);
    }
  }
}
