const { body } = require("express-validator");

exports.productValidator = [
  //strings
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ max: 20 })
    .withMessage("Product name cannot exceed 20 characters"),

  body("brand")
    .trim()
    .notEmpty()
    .withMessage("Brand is required")
    .isLength({ max: 20 })
    .withMessage("Product Brand cannot exceed 20 characters"),

  // numbers
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number")
    .isFloat({ min: 1.0, max: 1000000.0 })
    .withMessage("Price must be between 1.0 and 1 million"),

  body("cost")
    .notEmpty()
    .withMessage("Cost price is required")
    .isNumeric()
    .withMessage("Cost price must be a number")
    .isFloat({ min: 1.0, max: 1000000.0 })
    .withMessage("Price must be between 1.0 and 1 million"),

  body("stock")
    .notEmpty()
    .withMessage("Stock is required")
    .isInt({ min: 0 })
    .withMessage("Stock must be a positive number")
    .isInt({ min: 0, max: 1000 })
    .withMessage("Stock must be between 0 and 1000"),

  ,
  // nested object validation
  body("specs.cpu")
    .trim()
    .notEmpty()
    .withMessage("CPU is required")
    .isLength({ max: 20 })
    .withMessage("CPU cannot exceed 10 characters"),
  body("specs.gpu")
    .trim()
    .notEmpty()
    .withMessage("GPU is required")
    .isLength({ max: 15 })
    .withMessage("GPU name cannot exceed 15 characters"),
  body("specs.ram")
    .trim()
    .notEmpty()
    .withMessage("RAM is required")
    .isLength({ max: 10 })
    .withMessage("RAM cannot exceed 10 characters"),
  body("specs.storage")
    .trim()
    .notEmpty()
    .withMessage("Storage is required")
    .isLength({ max: 15 })
    .withMessage("Stroage cannot exceed 10 characters"),
];
