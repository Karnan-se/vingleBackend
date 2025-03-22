import express from "express";
import connectDB from "./framework/database/connection";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import { logStream } from "./framework/web/errors/error";
import errorHandler from "./framework/web/middlware/errorHandler";
import userRouter from "./framework/router/user/userRouter";
import adminRouter from "./framework/router/admin/adminRouter";
import tutorRouter from "./framework/router/tutor/tutorRouter";
import {   startSocket } from "./framework/web/utils/socketConfig"; 
import { configKeys } from "./config";

const app = express();
const server = http.createServer(app); 


startSocket(server);


app.use(
  cors({
    credentials: true,
    origin: ["https://www.vingle.shop", configKeys.MY_DOMAIN ],
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
  console.log(`Server is running on ${configKeys.MY_DOMAIN}:${PORT}`);
});
