const mongoose = require("mongoose");
const User = require("../../models/userSchema");

// middleware to check if user exists or not.
async function checkUserExists(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "invalid user id" });
    }

    const userfound = await User.findById(id).populate("roleid");

    if (!userfound) {
      return res.status(404).json({ message: "user not found" });
    }

    req.user = userfound;

    next();
  } catch (err) {
    return res.status(500).json({ message: "Inernal server Error" });
  }
}

module.exports = checkUserExists; // to be required in userRoutes
