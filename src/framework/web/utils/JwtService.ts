import { ObjectId } from "mongoose";
import IJwtService from "../../../entitties/interfaces/service.ts/IJwtService.ts";
import jwt from "jsonwebtoken"
import { configKeys } from "../../../config.ts";

const JWT_SECRET = configKeys.JWT_SECRET;
const REFRESH_TOKEN_SECRET = configKeys.REFRESH_TOKEN_SECRET
const ACCESS_TOKEN_EXPIRES_IN = '15m'; 
const REFRESH_TOKEN_EXPIRES_IN = '7d';

export class JwtService implements IJwtService {

    generateAccesSToken(userId: ObjectId | undefined | string): string {
        return jwt.sign({userId}, JWT_SECRET ,{expiresIn:ACCESS_TOKEN_EXPIRES_IN})
   
    }
    generateRefreshToken(userId: ObjectId | undefined | string): string {
        return jwt.sign({userId}, REFRESH_TOKEN_SECRET, {expiresIn:REFRESH_TOKEN_EXPIRES_IN})
        
    }
    verifyAccessToken(token:string){
        try {
            return jwt.verify(token, JWT_SECRET)
            
        } catch (error) {
            throw new Error("Invalid Token")
        }
    }
    verifyRefreshToken(token: string) {
        return jwt.verify(token, REFRESH_TOKEN_SECRET);
      }


}