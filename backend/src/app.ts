// Import necessary modules from Express, environment variables, and middleware
import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Load environment variables from .env file
config();

// Create an Express application
const app = express();

// Middlewares
// Enable Cross-Origin Resource Sharing (CORS) with specified options
app.use(cors({ origin: "https://server-convo-gpt.onrender.com/", credentials: true }));
// Parse JSON request bodies
app.use(express.json());
// Parse cookies using the specified secret
app.use(cookieParser(process.env.COOKIE_SECRET));

// *-- MUST BE REMOVED BEFORE *PRODUCTION* --*
// Enable logging in development mode
app.use(morgan("dev"));

// Use the defined routes under the "/api/v1" endpoint
app.use("/api/v1", appRouter);

// Export the configured Express application
export default app;
