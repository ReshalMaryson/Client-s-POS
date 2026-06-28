const mongoose = require("mongoose");

const invoiceSequenceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  sequence: {
    type: Number,
    default: 0,
  },
});
