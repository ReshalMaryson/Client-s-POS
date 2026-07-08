const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//model
const Product = require("../models/productSchema");

// validators and middleware
const verifyToken = require("../middlewares/auth/verifyJWT");
const { isAdmin } = require("../middlewares/auth/isAdminMiddleware");
const { productValidator } = require("../validators/productValidator");
const validate = require("../middlewares/product/prodValidate");

// controller
const {
  createProduct,
  Products,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// get all products
router.get("/", verifyToken, isAdmin, Products);

// get product by id
router.get("/:id", verifyToken, getProductById);

// create a product
router.post("/", verifyToken, productValidator, validate, createProduct);

// delete a product
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

// update a product
router.put(
  "/:id",
  verifyToken,
  isAdmin,
  productValidator,
  validate,
  updateProduct,
);

module.exports = router;
