// Import necessary modules from Express and other utility files
import { Router } from "express";
import {
  getAllUsers,
  userLogin,
  userSignup,
  verifyUser,
} from "../controllers/user-controllers.js";
import {
  loginValidator,
  signupValidator,
  validate,
} from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

// Create a router for user-related routes
const userRoutes = Router();

// Define a route to get all users
userRoutes.get("/", getAllUsers);

// Define a route for user signup, including validation middleware
userRoutes.post("/signup", validate(signupValidator), userSignup);

// Define a route for user login, including validation middleware
userRoutes.post("/login", validate(loginValidator), userLogin);

// Define a route to check the authentication status of the user
userRoutes.get("/auth-status", verifyToken, verifyUser);

// Export the router for use in the main application
export default userRoutes;
