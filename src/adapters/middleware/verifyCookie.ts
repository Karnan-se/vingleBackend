import { Request , Response, NextFunction } from "express"



const isAutherised = async(req:Request, res:Response, next:NextFunction)=>{
    const accessToken = req.cookies["accessToken"]

}