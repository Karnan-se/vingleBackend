import mongoose, { Schema } from "mongoose";



const  OrderSchema = new Schema({
    userId:{type:String, required:true},
    courseId:{type:String, required:true},
    totalAmount:{type:Number, required:true},
    paymentId:{type:String, required:true},
    paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
    invoice:{type:String}
},{
    timestamps:true
})

export const OrderModal = mongoose.model("Order", OrderSchema)