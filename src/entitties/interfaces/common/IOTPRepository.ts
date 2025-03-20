import {IOTP} from "../admin/Iotp"
interface OTPRepository {
    createOTP({ email, otp }: { email: string |undefined; otp: string }): Promise<IOTP>;
    findOTPbyEmail(email: string | undefined, otp:string): Promise<IOTP | null>;
    
  }
  export default OTPRepository