const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["admin", "cashier", "customer"],
    require: true,
  },
});

module.exports = mongoose.model("userroles", roleSchema);
