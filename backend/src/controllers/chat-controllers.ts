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

    // Return the updated chats to the client
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    // Handle errors and return an appropriate response to the client
    console.log("Error in generating chat completion: ", error);
    return res.status(500).json({ message: "Oops!, something went wrong :|" });
  }
};
