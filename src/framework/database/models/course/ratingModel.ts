import { Schema } from "mongoose";
import mongoose from "mongoose";



const ratingSchema = new Schema({
    courseId :  {
        type:String,
        ref:"Course",
        required:true,
    },
    userId: {
        type: String,
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
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },

})

export const RatingModal = mongoose.model("Rating", ratingSchema)