import { ObjectId } from "mongoose";
import IJwtService from "../../../entitties/interfaces/service.ts/JwtService";
import jwt from "jsonwebtoken"



class JwtService implements IJwtService {

    generateAccesSToken(userId: ObjectId | undefined): string {
        return jwt.sign({userId}, )

        
        
    }

}