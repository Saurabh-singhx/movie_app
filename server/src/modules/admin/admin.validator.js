import { body } from "express-validator";

export const createMovieValidator = [
  body("movieName")
    .trim()
    .notEmpty().withMessage("Movie name is required")
    .bail()
    .isLength({ min: 2 }).withMessage("Movie name must be at least 2 characters")
    .bail(),

  body("releaseDate")
    .notEmpty().withMessage("Release year is required")
    .isInt({ min: 1888, max: new Date().getFullYear() }) // first movie = 1888
    .withMessage(`Release year must be a valid year between 1888 and ${new Date().getFullYear()}`)
    .bail(),

  body("duration")
    .notEmpty().withMessage("Duration is required")
    .isInt({ min: 1 }).withMessage("Duration must be a positive integer")
    .bail(),

  body("description")
    .trim()
    .notEmpty().withMessage("Description is required")
    .isLength({ min: 10 }).withMessage("Description must be at least 10 characters")
    .bail(),

  body("coverImageUrl")
    .trim()
    .notEmpty().withMessage("Cover image URL is required")
    .isURL().withMessage("Cover image must be a valid URL")
    .bail()
];

