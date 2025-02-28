import { Request, Response, NextFunction } from "express";
import { JwtService } from "../utils/JwtService.ts";
import { attachTokenCookie } from "../../../adapters/middleware/cookie.ts";

const jwtService = new JwtService();

const jwtAuth = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies["AccessToken"];
  const refreshToken = req.cookies["RefreshToken"];

  if (!refreshToken) {
    console.log("token is missing");
    return res
      .status(403)
      .json({ err: "Token is Missing", name: "TokenMissingError" });
  }

  try {
    if (accessToken) {
      const { userId, role } = jwtService.verifyAccessToken(accessToken);

      if (userId && role) {

        (req as any)[role] = userId;

        return next();
      }
    }
  } catch (err: any) {
    console.log("Access token verification failed:", err.message);
  }

  try {
    const refreshTokenResponse = jwtService.verifyRefreshToken(refreshToken);

    const { userId, role } = refreshTokenResponse;
    console.log(`User ID: ${userId}, Role: ${role}`);

    const newAccessToken = jwtService.generateAccesSToken(
      refreshTokenResponse.userId,
      role
    );

    attachTokenCookie("AccessToken", newAccessToken, res);
    console.log("accessTOken is expired but we has refreshTOken");

    (req as any)[role] = refreshTokenResponse.userId;
    return next();
  } catch (error: any) {
    console.log("Refresh token verification failed:", error.message);
    return res.status(403).json({ err: "Refresh Token is Invalid" });
  }
};

export default jwtAuth;
