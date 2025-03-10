import mongoose, { Schema } from 'mongoose';

const OrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course', // Reference to the Course model
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending',
  },
  invoice: {
    type: String,
  },
}, {
  timestamps: true,
});

const OrderModal = mongoose.model('Order', OrderSchema);

export { OrderModal };
