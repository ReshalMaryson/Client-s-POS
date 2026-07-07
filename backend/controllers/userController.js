const mongoose = require("mongoose");
const bcyrpt = require("bcrypt");

//Schemas
const Tokens = require("../models/refreshTokenSchema");
const User = require("../models/userSchema");

//get all users
exports.allUsers = async (req, res) => {
  try {
    const users = await User.find().populate("roleid");

    if (!users) {
      return res.status(404).json({
        status: "failure",
        message: "failed to fetch users",
      });
    }

    return res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      status: "failure",
      message: "Server Error",
    });
  }
};

// get user by id
exports.getUserById = async (req, res) => {
  // req.user is getting set by checkUserExists middleware used in route.
  try {
    if (!req.user) {
      return res.status(400).json({
        status: "fialure",
        message: "Error Processing Req",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "user found",
      data: req.user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failure",
      message: "Server Error",
    });
  }
};

// get JWT verified user
exports.getVerifiedUser = async (req, res) => {
  try {
    const id = req.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(500).json({ status: "failure", message: "invalid Id" });
    }

    const user = await User.findById(id).populate("roleid");
    if (!user) {
      return res
        .status(404)
        .json({ status: "failure", message: "User not found" });
    }

    //success respose
    return res
      .status(200)
      .json({ status: "success", message: "details fetched", user: user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failure",
      message: "Server Error",
    });
  }
};

//create a user
exports.createUser = async (req, res) => {
  try {
    const password = req.body.password;

    const hashedPass = await bcyrpt.hash(password, 10);

    if (!mongoose.Types.ObjectId.isValid(req.body.roleid)) {
      return res
        .status(400)
        .json({ message: `error : invalid roleid ${req.body.roleid}` });
    }

    const payload = {
      name: req.body.name,
      email: req.body.email,
      phone: Number(req.body.phone),
      roleid: req.body.roleid,
      password: hashedPass,
    };

    const userAdded = await User.create(payload);

    if (!userAdded) {
      return res.status(400).json({
        status: "failure",
        message: "failed to create user",
      });
    }
    userAdded.password = "";
    return res.status(201).json({
      status: "success",
      message: "created",
      data: userAdded,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: "Server Error " + err.message,
    });
  }
};

// delete logged in user's account and delete its current token
exports.deleteUser = async (req, res) => {
  try {
    const Id = new mongoose.Types.ObjectId(req.params.id);
    if (!Id) {
      return res.status(400).json({ message: "invalid parameter Id" });
    }

    const deleteduser = await User.findByIdAndDelete({ _id: Id });
    if (!deleteduser) {
      return res.status(404).json({
        status: "failure",
        message: `User not found with id: ${Id}`,
      });
    }

    // clear the cookies on the client side.
    res.clearCookie("token");
    res.clearCookie("refreshToken");

    return res.status(200).json({
      status: "success",
      message: "user deleted",
      data: deleteduser._id,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: "Server Error " + err.message,
    });
  }
};

// delete user's account and delete all its token
exports.deleteAUser = async (req, res) => {
  try {
    const Id = new mongoose.Types.ObjectId(req.params.id);
    if (!Id) {
      return res.status(400).json({ message: "invalid parameter Id" });
    }

    const deleteduser = await User.findByIdAndDelete({ _id: Id });

    if (!deleteduser) {
      return res.status(404).json({
        status: "failure",
        message: `User not found with id: ${Id}`,
      });
    }

    const tokens = await Tokens.deleteMany({ user: Id });

    return res.status(200).json({
      status: "success",
      message: "user deleted",
      tokens: tokens.deletedCount > 0 ? true : false,
      data: deleteduser._id,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: "Server Error " + err.message,
    });
  }
};

//update user
exports.updateUser = async (req, res) => {
  try {
    const Id = req.params.id;
    console.log("PARAM ID:", Id);
    console.log("TYPE:", typeof Id);
    if (!mongoose.Types.ObjectId.isValid(Id)) {
      return res.status(400).json({ message: "invalid Id" });
    }

    const payload = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };
    // update in the DB
    const userupdated = await User.findByIdAndUpdate(Id, payload, {
      new: true,
      runValidators: true,
    });

    if (!userupdated) {
      return res.status(404).json({
        status: "faliure",
        message: "failed to update/User not Found",
      });
    }

    return res
      .status(200)
      .json({ status: "success", message: "updated", user: userupdated });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "failure", message: "server error " + err.message });
  }
};
