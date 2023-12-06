import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
  try {
    await connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log("Error Connecting from Database!", error);
    throw new Error("Unable to Connect from MongoDB!");
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();
  } catch (error) {
    console.log("Error Disconnecting from Database!", error);
    throw new Error("Unable to Disconnect from MongoDB!");
  }
}

export { connectToDatabase, disconnectFromDatabase };
