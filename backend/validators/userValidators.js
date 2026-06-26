const { body } = require("express-validator");

// user create validator
exports.createUserValidator = [
  //strings
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 20 })
    .withMessage("Name cannot exceed 20 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isLength({ max: 30 })
    .withMessage("Email cannot exceed 20 characters"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password: min 6 characters , max 15 characters - only"),

  // numbers
  body("phone")
    .isLength({ min: 11, max: 11 })
    .withMessage("Phone must be of 11 digits"),
];

//user update validator
exports.updateUserValidator = [
  //strings
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 20 })
    .withMessage("Name cannot exceed 20 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isLength({ max: 30 })
    .withMessage("Email cannot exceed 20 characters"),

  // number
  body("phone")
    .isLength({ min: 11, max: 11 })
    .withMessage("Phone must be of 11 digits"),
];
