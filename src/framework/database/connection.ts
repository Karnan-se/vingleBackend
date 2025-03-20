import mongoose  from  "mongoose"
import dotenv from "dotenv";

dotenv.config();

async function connectDB() {
    const dbURI = process.env.MONGOURL as string
    try {
    await  mongoose.connect(dbURI)
    console.log("database Connnected")
        
    } catch (error) {
        console.log(error)
        
    }

}

export default connectDB