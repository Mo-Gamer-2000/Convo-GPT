// Import necessary functions from Mongoose for database connection
import { connect, disconnect } from "mongoose";

// Function to connect to the MongoDB database
async function connectToDatabase() {
  try {
    // Attempt to establish a connection using the provided MongoDB URL
    await connect(process.env.MONGODB_URL);

    // Log information only in development
    if (process.env.NODE_ENV === "development") {
      console.log("Connected to the MongoDB database successfully.");
    }
  } catch (error) {
    // Handle connection errors and log details
    console.error("Error connecting to the database:", error);

    // Throw an error indicating failure to connect
    throw new Error("Unable to connect to MongoDB!");
  }
}

// Function to disconnect from the MongoDB database
async function disconnectFromDatabase() {
  try {
    // Attempt to disconnect from the database
    await disconnect();

    // Log information only in development
    if (process.env.NODE_ENV === "development") {
      console.log("Disconnected from the MongoDB database successfully.");
    }
  } catch (error) {
    // Handle disconnection errors and log details
    console.error("Error disconnecting from the database:", error);

    // Throw an error indicating failure to disconnect
    throw new Error("Unable to disconnect from MongoDB!");
  }
}

// Export the database connection functions for external use
export { connectToDatabase, disconnectFromDatabase };
