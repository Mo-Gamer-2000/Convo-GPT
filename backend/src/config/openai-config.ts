// Import the necessary module for OpenAI configuration
import { Configuration } from "openai";

// Function to configure and return OpenAI settings
export const configureOpenAI = () => {
  // Create a new OpenAI Configuration object
  const config = new Configuration({
    // Set the API key from the environment variable
    apiKey: process.env.OPEN_AI_SECRET,
    // Set the organization ID from the environment variable
    organization: process.env.OPENAI_ORGANIZATION_ID,
  });

  // Return the configured OpenAI settings
  return config;
};
