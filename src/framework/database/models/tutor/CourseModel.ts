import mongoose, { Schema, Types } from 'mongoose';


const itemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['video', 'document'], 
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const sectionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  items: [
    { 
      type: Schema.Types.ObjectId, 
      ref: 'Item', 
    },
  ],
}, { timestamps: true });


const courseSchema = new Schema({
  courseId: {
    type: String,
    required: true,
  },
  tutorId:{
    type:Schema.Types.ObjectId,
    ref:"Tutor"
  },
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Schema.Types.Mixed, 
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  sections: [
    { 
      type: Schema.Types.ObjectId, 
      ref: 'Section',
    },
  ],
  ratings: [
    { 
      type: Schema.Types.ObjectId, 
      ref: 'Rating', 
    },
  ],
  comments: [
    { 
      type: Schema.Types.ObjectId, 
      ref: 'Comment', 
    },
  ],
  isBlocked: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  users: {
    type: [String],
    default: [],
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRatings: {
    type: Number,
    default: 0,
  },

}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
const Section = mongoose.model('Section', sectionSchema);
const Item = mongoose.model('Item', itemSchema);

export { Course, Section, Item };
