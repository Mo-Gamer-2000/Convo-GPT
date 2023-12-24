// Import necessary modules from Mongoose and Crypto
import mongoose from "mongoose";
import { randomUUID } from "crypto";

// Define the schema for individual chat messages
const chatSchema = new mongoose.Schema({
  // Assign a unique ID to each chat message using randomUUID
  id: {
    type: String,
    default: randomUUID(),
  },
  // Specify the role of the chat message (e.g., user or other)
  role: {
    type: String,
    required: true,
  },
  // Store the content of the chat message
  content: {
    type: String,
    required: true,
  },
});

// Define the schema for user documents
const userSchema = new mongoose.Schema({
  // Specify the name of the user (required field)
  name: {
    type: String,
    required: true,
  },
  // Specify the email of the user (required and unique field)
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Specify the password of the user (required field)
  password: {
    type: String,
    required: true,
  },
  // Store an array of chat messages using the previously defined chatSchema
  chats: [chatSchema],
});

// Export the Mongoose model for the 'User' collection
export default mongoose.model("User", userSchema);
