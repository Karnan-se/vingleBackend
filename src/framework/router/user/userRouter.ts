import express from "express"
import { userController } from "../../dependencies/userdepencies.ts";
import verificationController from "../../dependencies/verificationDependency.ts";
import passport from "passport";




const userRouter = express.Router();

 


userRouter.post("/userRegister",(req,res,next)=>userController.signup(req,res,next) )
userRouter.post("/login", (req, res, next)=> userController.signIn(req, res, next))
userRouter.post("/resendOTP",(req, res, next)=>verificationController.resendOTP(req, res, next))
userRouter.post("/verifyUser",(req, res, next)=> verificationController.verifyUser(req, res, next))

userRouter.get(
    "/auth/google.callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
      const  userDetail = req.user ;
      console.log(userDetail)
      res.redirect("http://localhost:5173/dashboard");
    }
  );



export default userRouter