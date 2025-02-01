import mongoose, { Schema } from "mongoose";

const notificationTypes = ["message", "system", "other"];

const NotificationSchema = new Schema(
  {
    isRead: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: notificationTypes, 
      required: true,
    },
    content: {
      type: String,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
  },
  { timestamps: true }
);

const NotificationModal = mongoose.model("Notification", NotificationSchema);

export default NotificationModal;
