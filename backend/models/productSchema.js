const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, maxlength: 20 },
    brand: { type: String, maxlength: 20 },
    specs: {
      cpu: { type: String, maxlength: 20 },
      ram: { type: String, maxlength: 10 },
      storage: { type: String, maxlength: 20 },
      gpu: { type: String, maxlength: 15 },
    },
    price: { type: Number, min: 1.0, max: 1000000.0 },
    cost: { type: Number, min: 1.0, max: 1000000.0 },
    stock: { type: Number, min: 0, max: 1000 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("product", productSchema);
