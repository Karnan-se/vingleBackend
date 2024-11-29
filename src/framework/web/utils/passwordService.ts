import bcrypt from "bcrypt"
import AppError from "./appError";
import IpasswordService from "../../../entitties/interfaces/service.ts/passwordService";


export class PasswordService implements IpasswordService{

 async passwordHash(password:string):Promise<string>{
   const hashedPassword = await  bcrypt.hash(password, 10)
   return hashedPassword;
}
 async comparepassword(password:string, hashedPassed:string):Promise<boolean>{
   const isMatch = await bcrypt.compare(password, hashedPassed);
   return isMatch
}
}

