import nodemailer from 'nodemailer';
import { config } from 'dotenv';
import { configKeys } from '../../../config';
import AppError from './appError';


export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service : "gmail",
      auth: {
        user: configKeys.Email,
        pass: configKeys.Mail_password
      },
    });
  }
  async sendVerificationEmail(email: string, otp: string): Promise<void> {
    const mailOptions = {
      from: configKeys.Email,
      to: email,
      subject: 'Email Verification',
      text: `Your OTP code is: ${otp}. Please use this code to verify your email.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
          <h2 style="color: #333;">Verify Your Email</h2>
          <p style="font-size: 16px; color: #555;">
            Thank you for signing up! To complete your registration, please use the OTP code below to verify your email address.
          </p>
          <div style="text-align: center; margin: 20px 0;">
            <p style="font-size: 24px; font-weight: bold; color: #007BFF; letter-spacing: 2px;">${otp}</p>
          </div>
          <p style="font-size: 16px; color: #555;">
            Please enter this OTP in the application to verify your account. This code will expire in 10 minutes.
          </p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
          <p style="font-size: 14px; color: #999;">
            If you didn't request this, please ignore this email. Your email will remain unverified.
          </p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending acceptance email:', error);
      throw new Error('Failed to send acceptance email');
    }
  }
  async sendRejectionMail(email: string, rejectionReason:string[]): Promise<void> {
    const mailOptions = {
      from: configKeys.Email,
      to: email,
      subject: "Your Tutor Application for Vingle Has Been Rejected",
      text: `We are sorry to inform you that your application for the tutor has been rejected for the following reasons: ${rejectionReason.join(
        ", "
      )}. Please consider reapplying if you believe you have genuine reasons to justify this decision. Thank you.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
          <h2 style="color: #D32F2F; text-align: center;">Application Rejected</h2>
          <p style="font-size: 16px; color: #555;">
            Dear Applicant,
          </p>
          <p style="font-size: 16px; color: #555;">
            We regret to inform you that your application for the tutor position at <strong>Vingle</strong> has been rejected. After careful consideration, we have determined that your application cannot be accepted at this time due to the following reasons:
          </p>
          <ul style="font-size: 16px; color: #555; margin: 20px 0; padding-left: 20px; line-height: 1.5;">
            ${rejectionReason
              .map(
                (reason) =>
                  `<li style="margin-bottom: 10px;">${reason}</li>`
              )
              .join("")}
          </ul>
          <p style="font-size: 16px; color: #555;">
            If you believe you have genuine reasons to address the above concerns, we encourage you to consider reapplying in the future. We value your interest in joining Vingle and wish you all the best in your endeavors.
          </p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
          <p style="font-size: 14px; color: #999; text-align: center;">
            Thank you.
          </p>
          <p style="font-size: 14px; color: #999; text-align: center;">
            Regards, <br />
            The Vingle Team
          </p>
        </div>
      `,
    };
  
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending the rejection mail:", error);
      throw AppError.conflict("Error sending the rejection mail.");
    }
  }

  async sendApproval(email: string, password: string): Promise<void> {
    const mailOptions = {
      from: configKeys.Email,
      to: email,
      subject: "Your Application Has Been Approved",
      text: `Congratulations! Your application has been approved. Here is your temporary password: ${password}. Please use it to log in and start your journey with us.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
          <h2 style="color: #388E3C; text-align: center;">Application Approved!</h2>
          <p style="font-size: 16px; color: #555;">
            Dear Applicant,
          </p>
          <p style="font-size: 16px; color: #555;">
            We are thrilled to inform you that your application for the instructor position at <strong>Vingle</strong> has been approved! We are excited to have you join our team and contribute to our community.
          </p>
          <p style="font-size: 16px; color: #555;">
            Here is your temporary password to log in and get started:
          </p>
          <div style="margin: 20px 0; text-align: center;">
            <span style="display: inline-block; font-size: 18px; color: #ffffff; background-color: #388E3C; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
              ${password}
            </span>
          </div>
          <p style="font-size: 16px; color: #555;">
            Please use this password to log in and change it immediately for security reasons. We look forward to seeing the amazing contributions you'll bring to our platform.
          </p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
          <p style="font-size: 14px; color: #999; text-align: center;">
            Thank you for joining us!
          </p>
          <p style="font-size: 14px; color: #999; text-align: center;">
            Regards, <br />
            The Vingle Team
          </p>
        </div>
      `,
    };
  
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending the approval mail:", error);
      throw AppError.conflict("Error sending the approval mail.");
    }
  }
  
  
}

