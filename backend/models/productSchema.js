const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    brand: String,
    specs: {
      cpu: String,
      ram: String,
      storage: String,
      gpu: String,
    },
    price: Number,
    cost: Number,
    stock: Number,
  },
  { timestamps: true },
);

module.exports = mongoose.model("product", productSchema);
