import cors, {CorsOptions} from "cors"
import express, { Request, Response, NextFunction } from "express";



const conditonalCors = (req: Request, res:Response, next:NextFunction)=>{

    const isRegistrationRoute = req.path == "/userRegister" || req.path == "/adminRegister" 
    const corsOptions:CorsOptions={
    origin: !isRegistrationRoute? "http://localhost:5173/ ": "*",
    credentials:!isRegistrationRoute
    }
    cors(corsOptions)(req, res, next)

}
export {conditonalCors}

