// Import the Express application and the database connection function
import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

// Set up connections and listeners
const PORT = process.env.PORT || 5000;

// Attempt to connect to the database
connectToDatabase()
  .then(() => {
    // If the database connection is successful, start the Express server
    app.listen(PORT, () => {
      if (process.env.NODE_ENV === 'production') {
        console.log(`Server is open and connected to the database on port ${PORT} 🚀`);
      }
    });
  })
  .catch((err) => {
    // If there's an error connecting to the database, log the error
    console.error("Error connecting to the database:", err);
  });