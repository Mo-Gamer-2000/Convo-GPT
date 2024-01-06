// Import necessary modules from Express and custom utility functions
import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
} from "../controllers/chat-controllers.js";

// Create a router for chat-related routes
const chatRoutes = Router();

// Define a protected API route for generating chat completions
chatRoutes.post(
  "/new",
  // Validate the request body against the chat completion validator
  validate(chatCompletionValidator),
  // Verify the authenticity of the user's token
  verifyToken,
  // Call the controller function to generate a chat completion
  generateChatCompletion
);

// Define a protected API route for retrieving all user chats
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);

// Define a protected API route for deleting all user chats
chatRoutes.delete("/delete", verifyToken, deleteChats);

// Export the router for use in the main application
export default chatRoutes;
