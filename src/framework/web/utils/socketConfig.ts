import { Server   as SocketServer } from "socket.io";
import { Server as httpServer } from "http";
import { io } from "../../../app";




io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("joinRoom" , (userId)=>{
    socket.join(userId)
    console.log(`User ${userId} joined room ${userId}`);
  })
  socket.on("isRead" ,(data)=>{
    console.log(data ,  "dayaha kjqbdjb ")
})


  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

