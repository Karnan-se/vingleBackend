import { Schema } from "mongoose";
import mongoose from "mongoose";



const ratingSchema = new Schema({
    courseId :  {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      ratingValue: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      review: {
        type: String,
        required: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },

})

export const RatingModal = mongoose.model("Rating", ratingSchema)