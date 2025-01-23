import { Schema } from "mongoose";
import mongoose from "mongoose";

const progressSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    completedItems: [
      {
        itemId: {
          type: Schema.Types.ObjectId,
          ref: "Item",
        },
          percentageCompleted: {
            type: Number,
            default: 0,
            max:100
          },
      },
    ],
    progressPercentage: {
      type: Number,
      default: 0,
    },
    lastAccessed: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const ProgressModal = mongoose.model("Progress", progressSchema);
export { ProgressModal };
