import mongoose from "mongoose";

// Define the schema for storing emails and recorded videos
const VideoSchema = new mongoose.Schema({
  senderName: {
    type: String,
    required: true,
  },
  senderEmail: {
    type: String,
    required: true,
    unique:true,
  },
  recordedVideo: {
    type: String, // Store binary data of the video
    required: true,
  },
}, { timestamps: true });

export default mongoose.model.Videos || mongoose.model('Video', VideoSchema);

