import { ObjectId } from "mongoose";
import { JwtPayload } from "jsonwebtoken";

interface IJwtService {
  generateAccesSToken(userId: ObjectId | undefined): string;
  generateRefreshToken(userId: ObjectId | undefined): string;
  verifyAccessToken(token: string): JwtPayload & { userId: string };
  verifyRefreshToken(token: string): JwtPayload & { userId: string };
}

export default IJwtService;
