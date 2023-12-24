// Import necessary modules from Express and other route files
import { Router } from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-routes.js";

// Create a router for the main application routes
const appRouter = Router();

// Use the user routes under the "/user" endpoint (e.g., domain/api/v1/user)
appRouter.use("/user", userRoutes);

// Use the chat routes under the "/chats" endpoint (e.g., domain/api/v1/chats)
appRouter.use("/chats", chatRoutes);

// Export the router for use in the main application
export default appRouter;
