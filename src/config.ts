import dotenv from "dotenv";
dotenv.config();

const configKeys = { 
    JWT_SECRET: process.env.JWT_SECRET as string,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,

    NODE_ENV : process.env.NODE_ENV as string,
    Email :process.env.EMAIL,
    Mail_password:process.env.Mail_password,
    GOOGLE_CLIENT_ID :process.env.GOOGLE_CLIENT_ID,
    GOOGLE_SECRET :process.env.CLIENT_SECRET,
    
    CLOUDINARY_CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET,

    ACCESS_TOKEN_EXPIRES_IN :15 * 60 * 1000,
    REFRESH_TOKEN_EXPIRES_IN : 7 * 24 * 60 * 60 * 1000,
    STRIPE_SECRET_KEY:process.env.STRIPE_SECRET_KEY,
    MY_DOMAIN_NAME:process.env.MY_DOMAIN,
    VINGLE_LOGO : process.env.VINGLE_LOGO,
    CERTIFICATE_TEMPLATE : process.env.CERTIFICATE_TEMPLATE

}

export {configKeys}