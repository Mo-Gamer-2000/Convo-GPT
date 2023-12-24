// Import necessary modules from Express, JSON Web Token (JWT), and constants
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

// Function to create a JWT token with a specified payload and expiration time
export const createToken = (id: string, email: string, expiresIn: string) => {
  // Define the payload for the token
  const payload = { id, email };
  // Sign the payload and create a token using the JWT_SECRET from environment variables
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
  // Return the generated token
  return token;
};

// Middleware function to verify the authenticity of a JWT token
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Retrieve the token from signed cookies
  const token = req.signedCookies[`${COOKIE_NAME}`];

  // Check if the token is missing or empty
  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }

  // Use a promise to handle asynchronous verification
  return new Promise<void>((resolve, reject) => {
    // Verify the token using the JWT_SECRET from environment variables
    return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
      // If there's an error, reject the promise and return an error response
      if (err) {
        reject(err.message);
        return res.status(401).json({ message: "Token Expired" });
      } else {
        // If successful, resolve the promise, store the decoded data in res.locals, and proceed to the next middleware
        resolve();
        res.locals.jwtData = success;
        return next();
      }
    });
  });
};
