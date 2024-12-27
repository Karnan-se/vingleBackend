interface EmailService {
    sendVerificationEmail(email: string | undefined, otp: string): Promise<void>;
    sendRejectionMail(email: string, rejectionReason:string[]): Promise<void>
    sendApproval(email: string, password: string): Promise<void>
  }
  export default EmailService