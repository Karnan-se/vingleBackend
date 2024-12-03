import { CookieOptions , Response} from "express"
import { configKeys } from "../../config.ts"


const attachTokenCookie =(cookieName:string, Token:string, res:Response)=>{
    const cookieOption :CookieOptions= {
        httpOnly:true,
        secure:configKeys.NODE_ENV == "production",
        signed:false,
        maxAge:24*60*1000
    }
    try {
        res.cookie(cookieName, Token,cookieOption)
        console.log("cookieAttached")
        
    } catch (error) {
        console.log(error)
        
    }
  

}

export {attachTokenCookie}