import { error } from "console";
import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

// Connections & Listeners
const PORT = process.env.PORT || 5000;
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => console.log("Server is Running on Port 5000!"));
  })
  .catch((err) => console.log(err));
