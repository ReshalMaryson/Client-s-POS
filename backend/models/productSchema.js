const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, maxlength: 50 },
    brand: { type: String, maxlength: 50 },
    specs: {
      cpu: { type: String, maxlength: 50 },
      ram: { type: String, maxlength: 50 },
      storage: { type: String, maxlength: 50 },
      gpu: { type: String, maxlength: 50 },
    },
    price: { type: Number, min: 1.0, max: 1000000.0 },
    cost: { type: Number, min: 1.0, max: 1000000.0 },
    stock: { type: Number, min: 0, max: 1000 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("product", productSchema);
