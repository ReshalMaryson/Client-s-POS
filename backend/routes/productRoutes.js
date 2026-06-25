const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//model
const Product = require("../models/productSchema");

// validators and middleware
const verifyToken = require("../middlewares/auth/verifyJWT");
const { productValidator } = require("../validators/productValidator");
const validate = require("../middlewares/product/prodValidate");

// controller
const {
  productCreate,
  Products,
  getProductById,
} = require("../controllers/productController");

// get all products
router.get("/", verifyToken, Products);

// get product by id
router.get("/:id", verifyToken, getProductById);

// create a product
router.post("/", verifyToken, productValidator, validate, productCreate);

module.exports = router;
