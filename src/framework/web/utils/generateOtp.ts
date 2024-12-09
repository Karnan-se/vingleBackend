import IGenerateOtp from "../../../entitties/interfaces/admin/IGenerateOtp";

export class GenerteOtp implements IGenerateOtp {
    public generate(): string {
       
        let otp = Math.floor(Math.random() * 9000) + 1000;
        return otp.toString(); 
    }
}
 
