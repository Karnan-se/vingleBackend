import { Iuser } from "./user.ts";




export interface IUserUseCase {
    signup(user: Iuser): Promise<Iuser | null>;
    verifyOtp(email: string, otp: string | null): Promise<void>;
    signIn(user: Iuser): Promise<{
      existingUser: Iuser | null;
      accessToken: string | null;
      refreshToken: string | null;
    }>;
  }