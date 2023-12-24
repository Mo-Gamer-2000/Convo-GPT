// Import necessary modules from Express and Express Validator
import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

// Middleware function to handle validation based on provided rules
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Iterate through the specified validations and run them on the request
    for (let validation of validations) {
      const result = await validation.run(req);
      // If any validation fails, break out of the loop
      if (!result.isEmpty()) {
        break;
      }
    }

    // Check for validation errors
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      // If no errors, proceed to the next middleware
      return next();
    }

    // If validation errors exist, return a 422 Unprocessable Entity status with error details
    return res.status(422).json({ errors: errors.array() });
  };
};

// Validator rules for user login
export const loginValidator = [
  body("email").trim().isEmail().withMessage("Email is Required"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("The Password must be at Least 6 Characters Long"),
];

// Validator rules for user signup, including login validation
export const signupValidator = [
  body("name").notEmpty().withMessage("Name is Required"),
  ...loginValidator,
];

// Validator rules for chat completion request
export const chatCompletionValidator = [
  body("message").notEmpty().withMessage("Message is Required"),
];
