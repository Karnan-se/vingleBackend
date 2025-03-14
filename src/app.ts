import express from "express";
import connectDB from "./framework/database/connection.ts";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import { logStream } from "./framework/web/errors/error.ts";
import errorHandler from "./framework/web/middlware/errorHandler.ts";
import userRouter from "./framework/router/user/userRouter.ts";
import adminRouter from "./framework/router/admin/adminRouter.ts";
import tutorRouter from "./framework/router/tutor/tutorRouter.ts";
import {   startSocket } from "./framework/web/utils/socketConfig.ts"; 

const app = express();
const server = http.createServer(app); 


startSocket(server);


app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(morgan("combined", { stream: logStream }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true, parameterLimit: 100000 }));


app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/tutor", tutorRouter);


connectDB();


app.use(errorHandler);


app.get("/", (req, res) => {
  res.send("Hello World with Socket.IO");
});


const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
