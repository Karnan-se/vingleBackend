import { ObjectId } from "mongoose"

interface JwtService {
    generateAccesSToken(userId:ObjectId | undefined):string 
    generateRefreshToken(userId:ObjectId | undefined):string
}

export default JwtService