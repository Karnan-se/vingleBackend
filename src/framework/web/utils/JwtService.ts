import { ObjectId } from "mongoose";
import IJwtService from "../../../entitties/interfaces/service.ts/IJwtService.ts";
import jwt, { JwtPayload } from "jsonwebtoken";
import { configKeys } from "../../../config.ts";

const JWT_SECRET = configKeys.JWT_SECRET;
const REFRESH_TOKEN_SECRET = configKeys.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

export class JwtService implements IJwtService {
  generateAccesSToken(userId: ObjectId | undefined | string , role:string): string {
    return jwt.sign({ userId , role }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
  }

  generateRefreshToken(userId: ObjectId | undefined | string , role:string): string {
    return jwt.sign({ userId , role }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
  }

  verifyAccessToken(token: string): JwtPayload & { userId: string } {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & { userId: string };
   
      return decoded;
    } catch (error) {
      throw new Error("Invalid Access Token");
    }
  }

  verifyRefreshToken(token: string): JwtPayload & { userId: string } {
    try {
      const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as JwtPayload & { userId: string };
    
      return decoded;
    } catch (error) {
      throw new Error("Invalid Refresh Token");
    }
  }
}
