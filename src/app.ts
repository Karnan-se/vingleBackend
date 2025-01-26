import express from "express";
import connectDB from "./framework/database/connection.ts";
import cookieparser from "cookie-parser";
import cors from "cors";
import userRouter from "./framework/router/user/userRouter.ts";
import { logStream } from "./framework/web/errors/error.ts";
import morgan from "morgan";
import errorHandler from "./framework/web/middlware/errorHandler.ts";
import adminRouter from "./framework/router/admin/adminRouter.ts";
import tutorRouter from "./framework/router/tutor/tutorRouter.ts";
import { createRequire } from "module";
import { Server } from "socket.io";
import http from "http"; 

const require = createRequire(import.meta.url);

const app = express();


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
    credentials: true,
  },
});


app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(morgan("combined", { stream: logStream }));
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true, parameterLimit: 100000 }));


app.get("/", (req, res, next) => {
  res.send("Hello World with Socket.IO");
  next();
});


app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/tutor", tutorRouter);


connectDB();


app.use(errorHandler);


io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  
  socket.on("message", (data) => {
    console.log("Message received:", data);

    socket.emit("response", { message: "Message received successfully!" });
    
  });

 
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});


const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
