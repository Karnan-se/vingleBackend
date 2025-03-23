import { JwtTokens } from "../jwt/jwtservice";
import { Iuser } from "./user";
import { ObjectId } from "mongoose";




export interface IUserUseCase {
    signup(user: Iuser): Promise<{
      createdUser:Iuser | null
      accessToken: string 
      refreshToken: string 

    }>;



    verifyOtp(email: string, otp: string | null): Promise<void>;
    signIn(user: Iuser): Promise<{
      existingUser: Iuser | null;
      accessToken: string | null;
      refreshToken: string | null;
    }>;

  generateJwtToken(userId:ObjectId , role:string):Promise<JwtTokens>
  }