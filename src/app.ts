import express from "express"
import connectDB from "./framework/database/connection.ts"
import cookieparser from "cookie-parser"
import cors from "cors"
import userRouter from "./framework/router/user/userRouter.ts"
import { conditonalCors } from "./cors.ts"
import errorHandler from "./framework/web/middlware/errorHandler.ts"
import adminRouter from "./framework/router/admin/adminRouter.ts"
import tutorRouter from "./framework/router/tutor/tutorRouter.ts"


const app = express()

app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}))

app.use(cookieparser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))



app.get("/", (req, res, next)=>{
    res.send("hello2")
    next()
   
})
app.use("/user",userRouter);
app.use("/admin",adminRouter)
app.use("/tutor", tutorRouter)

connectDB()

app.use(errorHandler);

app.listen(3000, ()=>{
    console.log("server Created SuccessFully")
})