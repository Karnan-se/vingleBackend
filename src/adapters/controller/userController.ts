import { Request, Response, NextFunction } from "express";
import UserUseCase from "../../usecases/userServices";
import { attachTokenCookie } from "../middleware/cookie";
import { HttpStatus } from "../../entitties/Enums/statusCode";

export class UserController {
  private userUseCase: UserUseCase;

  constructor(userUseCase: UserUseCase) {
    this.userUseCase = userUseCase;
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body.user;
      console.log(user);
      const { createdUser, accessToken, refreshToken } =
        await this.userUseCase.signup(user);
      console.log(accessToken, "accessToken \n");
      console.log(refreshToken, "RefreshToken");
      attachTokenCookie("AccessToken", accessToken, res);
      attachTokenCookie("RefreshToken", refreshToken, res);
      res.status(HttpStatus.OK).json({ success: true, data: createdUser });
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    const user = req.body.user;
    console.log(user);
    try {
      const { existingUser, accessToken, refreshToken } =
        await this.userUseCase.signIn(user);
      console.log(accessToken, "accessToken \n");
      console.log(refreshToken, "RefreshToken");
      attachTokenCookie("AccessToken", accessToken, res);
      attachTokenCookie("RefreshToken", refreshToken, res);
      res.status(HttpStatus.OK).json({ success: true, data: existingUser });
    } catch (error: any) {
      next(error);
    }
  }
  async updatedUser(req: Request, res: Response, next: NextFunction) {
    const user = req.body.user;
    console.log(user);
    try {
      const updatedUser = await this.userUseCase.UpdateUser(user);
      console.log(updatedUser, "updated User");
      res.status(HttpStatus.OK).json({ message: "success", data: updatedUser });
    } catch (error) {
      next(error);
    }
  }
  async SendOTP(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body.user;
    try {
      const sendOTP = await this.userUseCase.sendOTP(email);
      console.log(sendOTP);

      res.status(HttpStatus.OK).json({ message: "success", data: sendOTP });
    } catch (error) {
      next(error);
    }
  }
  async ChangePassword(req: Request, res: Response, next: NextFunction) {
    const { emailAddress, password } = req.body.user;
    try {
      const userDetails = await this.userUseCase.changePassword(
        emailAddress,
        password
      );
      if (userDetails) {
        return res.status(HttpStatus.OK).json({ data: userDetails });
      }
    } catch (error) {
      next(error);
    }
  }

  async findUserBYId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.body;
      const userDetails = await this.userUseCase.findUserById(userId);
      // console.log("from controlller ," ,  userDetails)
      res.status(HttpStatus.OK).json({ userDetails });
    } catch (error) {}
  }
  async userLogout(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies["RefreshToken"];
      console.log(refreshToken, "\n", "refreshtoken");
      res.clearCookie("RefreshToken");
      res.clearCookie("AccessToken");
      res.status(HttpStatus.OK).json({ message: "REfreshToken Cleard" });
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async paginatedStudents(req:Request , res:Response , next:NextFunction){
    try {
    const {pageNumber , search ,  filterChange}  = req.query
    console.log(pageNumber ,  search ,  ":", "search" , filterChange)

    const {students , totalStudents } = await this.userUseCase.PaginatedService(pageNumber as unknown as  number, search as string , filterChange as string)

      res.status(HttpStatus.OK).json({students , totalStudents})
    } catch (error) {
      console.log(error)
      throw error
      
    }
  }
  async blockUser(req:Request, res:Response, next:NextFunction){
    try {
      const { user } = req.body
      // console.log(user , "userId")
      const blockUser = await this.userUseCase.blockUser(user._id)
      res.status(HttpStatus.OK).json({blockUser})
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}
