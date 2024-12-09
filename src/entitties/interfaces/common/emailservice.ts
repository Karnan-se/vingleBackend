interface EmailService {
    sendVerificationEmail(email: string, otp: string): Promise<void>;
  }
  export default EmailService