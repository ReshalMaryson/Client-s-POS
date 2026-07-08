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
      user: req.id,
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
exports.createProduct = async (req, res) => {
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
exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = {
      name: req.body.name,
      brand: req.body.brand,
      specs: req.body.specs,
      price: req.body.price,
      cost: req.body.cost,
      stock: req.body.stock,
    };
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "failure",
        message: "Invalid product id",
      });
    }

    const updated = await Product.findByIdAndUpdate(id, payload, {
      new: true, // returns updated record
      runValidators: true, // applies the schema validation
    });

    if (!updated) {
      return res.status(404).json({
        status: "failure",
        message: "Product not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: updated,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failure",
      message: "Server Error",
    });
  }
};

// delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const Id = new mongoose.Types.ObjectId(req.params.id);
    if (!Id) {
      return res.status(400).json({ message: "invalid parameter Id" });
    }

    const deletedProduct = await Product.findByIdAndDelete({ _id: Id });
    if (!deletedProduct) {
      return res.status(404).json({
        status: "failure",
        message: `product not found with id: ${Id}`,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Product deleted",
      data: deletedProduct._id,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: "Server Error " + err.message,
    });
  }
};
