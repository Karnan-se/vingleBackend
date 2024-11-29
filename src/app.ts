import express from "express"
import connectDB from "./framework/database/connection.ts"
import cookieparser from "cookie-parser"
import cors from "cors"
import userRouter from "./framework/router/user/userRouter.ts"

const app = express()

app.use(cors({
    origin: "*", 
    // credentials:true
}))

app.use(cookieparser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))



app.get("/", (req, res, next)=>{
    res.send("hello2")
    next()
   
})
app.use("/user",userRouter);

connectDB()

app.listen(3000, ()=>{
    console.log("server Created SuccessFully")
})