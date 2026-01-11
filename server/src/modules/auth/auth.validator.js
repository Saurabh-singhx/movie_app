import { body } from "express-validator";

export const signupValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email address")
    .bail()
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .bail()
    .matches(/[a-z]/)
    .withMessage("Password must contain a lowercase letter")
    .bail()
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter")
    .bail()
    .matches(/[0-9]/)
    .withMessage("Password must contain a number")
    .bail()
    .matches(/[@$!%*?&]/)
    .withMessage("Password must contain a special character"),
];


export const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];
