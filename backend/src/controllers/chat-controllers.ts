// Import necessary modules and dependencies
import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";

// Controller function to generate chat completion
export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract the 'message' from the request body
  const { message } = req.body;

  try {
    // Retrieve user information based on the JWT data
    const user = await User.findById(res.locals.jwtData.id);

    // Check if the user exists
    if (!user)
      return res
        .status(401)
        .json({ message: "User not registered or token malfunctioned" });

    // Extract user's existing chats and append the new message
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    // Initialize OpenAI configuration and API
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);

    // Request a chat completion from the OpenAI API
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });

    // Append the OpenAI response to the user's chats and save
    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();

    // Log information only in development
    if (process.env.NODE_ENV === 'development') {
      console.log("Chat generated successfully:", chatResponse.data.choices[0].message);
    }

    // Return the updated chats to the client
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    // Handle errors and return an appropriate response to the client
    console.error("Error in generating chat completion: ", error);
    return res.status(500).json({ message: "Oops!, something went wrong :|" });
  }
};

// Verify user based on the provided token
export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Retrieve user information using the JWT data
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not Registered OR Token Malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions not Granted");
    }

    // Log information only in development
    if (process.env.NODE_ENV === 'development') {
      console.log("Chats sent to the user successfully.");
    }

    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.error(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

// Verify user based on the provided token
export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Retrieve user information using the JWT data
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not Registered OR Token Malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions not Granted");
    }

    // Log information only in development
    if (process.env.NODE_ENV === 'development') {
      console.log("Chats deleted successfully.");
    }

    // Delete all chats for this user
    // eslint-disable-next-line
    // @ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.error(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
