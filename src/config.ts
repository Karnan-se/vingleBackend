import dotenv from "dotenv";
dotenv.config();

const configKeys = { 
    JWT_SECRET: process.env.JWT_SECRET as string,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
    NODE_ENV : process.env.NODE_ENV as string
}

export {configKeys}