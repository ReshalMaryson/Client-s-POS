const Product = require("../models/productSchema");
const mongoose = require("mongoose");

//get all products
exports.Products = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(404).json({
        status: "failure",
        message: "products not found",
      });
    }
    return res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failure",
      message: "Server Error",
    });
  }
};

// get proudct by id
exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "failure",
        message: "Invalid product id",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        status: "failure",
        message: "product not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failure",
      message: "Server Error",
    });
  }
};

// create product
exports.productCreate = async (req, res) => {
  try {
    const prodCreate = await Product.create(req.body);

    // success response
    return res.status(201).json({
      status: "successs",
      message: "product added",
      data: prodCreate._id,
    });
  } catch (err) {
    // for dev
    console.log(err);

    return res.status(500).json({
      status: "failure",
      message: "Server Error",
    });
  }
};

// update a product
