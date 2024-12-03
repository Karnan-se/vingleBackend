import AppError from "../utils/appError.ts"; 
import { StatusCodes , ReasonPhrases } from "http-status-codes";
import { Request, Response,NextFunction, ErrorRequestHandler } from "express";

const errorHandler = (err:any, req:Request, res:Response, next:NextFunction)=>{
    if(err instanceof AppError){
    const statusCode = err.StatusCode || 500
    console.log("Error message is:",err.message)

    const responseDate ={
        error:{
            code:err.errorCode || StatusCodes.INTERNAL_SERVER_ERROR,
            message:err.message || ReasonPhrases.INTERNAL_SERVER_ERROR
        }
    }
    return res.status(statusCode).json(responseDate)
}
return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: ReasonPhrases.INTERNAL_SERVER_ERROR})

}
export default errorHandler