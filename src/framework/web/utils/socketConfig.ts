import { Server as SocketIOServer } from "socket.io";
import { Server as HttpServer } from "http";
import { ReadNotification } from "../socket/socketCommunication.ts";
import { saveMessage } from "../socket/socketCommunication.ts";
import { userInfo } from "os";
import { send } from "process";

let io: SocketIOServer;



export function startSocket(server: HttpServer) {

  let onlineUser: Record<string, string> = {}; 

  io = new SocketIOServer(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    console.log("Handshake:", socket.handshake.query.userId);
    let userId 
    if(socket.handshake.query.userId){
      userId = socket.handshake.query.userId.toString()
      onlineUser[userId] = socket.id
      console.log("this is online users",onlineUser)
 
      io.to(onlineUser[userId]).emit("onlineUsers" , onlineUser)
    } 


    socket.on("sendMessage", async (messages)=>{
    
      const savedMessage  = await  saveMessage(messages , socket , onlineUser);
      console.log(savedMessage, "messages saved")
      
      socket.to(onlineUser[savedMessage.receiverId]).emit("savedMessage", messages)
      socket.to(onlineUser[savedMessage.senderId]).emit("savedMessage", messages)

    })

    socket.on("peerSignal" , (signal)=>{
      console.log(signal , "signal signal  signals")
      socket.to(onlineUser[signal.receiverId]).emit("peerSignal", signal)
    })
    


    socket.on("isRead", (notificationSender, senderId) => {
      if (!notificationSender || !senderId) {
        return;
      }
      console.log(notificationSender, senderId);

      const isUpdated = ReadNotification(notificationSender, senderId);
      console.log(isUpdated, "isUpdated");

      
    });

    socket.on("isRinging", (sender)=>{
      socket.to(onlineUser[sender.receiverId._id]).emit("isRinging", sender)

    })

    socket.on("callDeclined", (sender)=>{
      console.log("receiverId " ,  sender)
      console.log(onlineUser[sender.sender._id])

    })

    socket.on("isCallAttended" , (sender)=>{
      socket.to(onlineUser[sender.sender._id]).emit("isCallAttended" , sender)
      console.log(sender)
    })


    socket.on("userCallCancelled", (participant)=>{
      console.log(participant ,  "participants")
      socket.to(onlineUser[participant._id]).emit("userCallCancelled", participant )
    })

    

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
      for (const userId in onlineUser) {
        if (onlineUser[userId] === socket.id) {
          delete onlineUser[userId];
          break;
        }
      }

      console.log("A user disconnected", socket.id);
      console.log(onlineUser, "Updated Online Users after disconnect")
    });
  });

  return io;
}

export { io };
