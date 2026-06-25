const { body } = require("express-validator");

exports.productValidator = [
  body("name").trim().notEmpty().withMessage("Product name is required"),

  body("brand").trim().notEmpty().withMessage("Brand is required"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number"),

  body("cost")
    .notEmpty()
    .withMessage("Cost price is required")
    .isNumeric()
    .withMessage("Cost price must be a number"),

  body("stock")
    .notEmpty()
    .withMessage("Stock is required")
    .isInt({ min: 0 })
    .withMessage("Stock must be a positive number"),

  // nested object validation
  body("specs.cpu").trim().notEmpty().withMessage("CPU is required"),
  body("specs.gpu").trim().notEmpty().withMessage("GPU is required"),
  body("specs.ram").trim().notEmpty().withMessage("RAM is required"),
  body("specs.storage").trim().notEmpty().withMessage("Storage is required"),
];
