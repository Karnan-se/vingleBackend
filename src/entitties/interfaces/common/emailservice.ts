interface EmailService {
    sendVerificationEmail(email: string | undefined, otp: string): Promise<void>;
  }
  export default EmailService