// Import necessary modules and dependencies
import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

// Retrieve all users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Log information only in development
    if (process.env.NODE_ENV === "development") {
      console.log("Retrieved all users successfully.");
    }

    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.error(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

// User Signup
export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract user information from the request body
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(401).send("User already registered");
    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Log information only in development
    if (process.env.NODE_ENV === "development") {
      console.log("User signed up successfully:", user.email);
    }

    // Create Token and Store Cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "https://Convo-GPT.onrender.com/api/v1",
      signed: true,
      path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "https://Convo-GPT.onrender.com/api/v1",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res
      .status(201)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.error(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

// User login
export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract user login credentials from the request body
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not Registered");
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect Password");
    }

    // Log information only in development
    if (process.env.NODE_ENV === "development") {
      console.log("User logged in successfully:", user.email);
    }

    // Create Token and Store Cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "https://Convo-GPT.onrender.com/api/v1",
      signed: true,
      path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "https://Convo-GPT.onrender.com/api/v1",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.error(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

// Verify user based on the provided token
export const verifyUser = async (
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
    if (process.env.NODE_ENV === "development") {
      console.log("User verified successfully:", user.email);
    }

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.error(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

// Logout user based on the provided token
export const userLogout = async (
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
    if (process.env.NODE_ENV === "development") {
      console.log("User logged out successfully:", user.email);
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "https://Convo-GPT.onrender.com/api/v1",
      signed: true,
      path: "/",
    });

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.error(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
