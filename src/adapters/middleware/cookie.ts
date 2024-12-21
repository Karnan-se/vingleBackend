import { CookieOptions , Response} from "express"
import { configKeys } from "../../config.ts"


const attachTokenCookie =(cookieName:string, Token:string, res:Response )=>{
    const cookieOption :CookieOptions= {
        httpOnly:true,
        secure:configKeys.NODE_ENV == "production",
        signed:false,
        maxAge:cookieName == "AccessToken"? Number(configKeys.ACCESS_TOKEN_EXPIRES_IN) : Number(configKeys.REFRESH_TOKEN_EXPIRES_IN)
    }
    try {
        res.cookie(cookieName, Token,cookieOption)
        console.log("cookieAttached")
        
    } catch (error) {
        console.log(error)
        
    }
  

}

export {attachTokenCookie}