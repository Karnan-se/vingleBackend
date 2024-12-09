import { ObjectId } from "mongoose"

interface IJwtService {
    generateAccesSToken(userId:ObjectId | undefined):string 
    generateRefreshToken(userId:ObjectId | undefined):string 
}

export default IJwtService                              