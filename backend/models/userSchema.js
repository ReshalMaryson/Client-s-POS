const mongoose = require("mongoose");
require("../models/userroleSchema");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: false,
      unique: true,
      match: /.+\@.+\..+/, // simple email validation
    },
    phone: { type: Number, min: 11 },
    roleid: {
      type: mongoose.Types.ObjectId,
      ref: "userroles",
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false, //will not be fetched by find()
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("user", userSchema);
