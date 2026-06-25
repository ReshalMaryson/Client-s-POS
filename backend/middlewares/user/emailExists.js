const mongoose = require("mongoose");
const User = require("../../models/userSchema");

// middleware to check if the provided email already exists in DB or not.

async function checkEmail(req, res, next) {
  const { email } = req.body;
  if (!email || email.trim() == "") {
    return next();
  }

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    return res.status(409).json({ message: "email already exists" });
  }

  next();
}

module.exports = checkEmail;
