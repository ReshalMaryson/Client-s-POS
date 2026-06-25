const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//model
const products = require("../models/productSchema");

// validators and middleware
const { productValidator } = require("../validators/productValidator");
const validate = require("../middlewares/product/prodValidate");

router.get("/", async (req, res) => {
  try {
    const products = await products.find();
    if (!produts) {
      return res.status(404).json({
        status: "failure",
        message: "products not found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Sucess",
      data: products,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: "Server Error",
    });
  }
});

router.post("/", productValidator, validate, (req, res) => {
  try {
    return res.status(200).json({
      data: req.body,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: "Server Error",
    });
  }
});
