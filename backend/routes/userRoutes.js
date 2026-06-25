const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcyrpt = require("bcrypt");

// models
const Users = require("../models/userSchema");

// middlewares
const checkUserExists = require("../middlewares/user/checkUserExist");
const emailCheck = require("../middlewares/user/emailExists");
const verifyToken = require("../middlewares/auth/verifyJWT");

//get a user by id
router.get("/:id", verifyToken, checkUserExists, async (req, res) => {
  // req.user is getting set by checkUserExists middleware.
  if (!req.user) {
    return res.status(400).json({
      message: "Error Processing Req",
    });
  }

  return res.status(200).json({
    message: "user found",
    data: req.user,
  });
});

//get the details of the user logged in currently.
router.get("/me", verifyToken, async (req, res) => {
  //res.send("hehe");
  try {
    const me = await Users.findById(req.id).populate("roleid");
    if (!me) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json({
      user: me,
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

// create a user
router.post("/", emailCheck, async (req, res) => {
  try {
    const { name, email, roleid, password } = req.body;
    const phone = Number(req.body.phone);

    // validate the fields
    if (
      !name ||
      name.trim() == "" ||
      !email ||
      email.trim() == "" ||
      !phone ||
      isNaN(phone) ||
      !password ||
      password.trim() == ""
    ) {
      return res.status(400).json({
        message: "missing required fields",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(roleid)) {
      return res
        .status(400)
        .json({ message: `error : invalid roleid ${roleid}` });
    }

    // hash the user's password
    const hashedPass = await bcyrpt.hash(password, 10);

    // add the data to DB
    const userData = {
      name: name,
      email: email,
      phone: phone,
      roleid: roleid,
      password: hashedPass,
    };

    const userAdded = await Users.create(userData);

    if (!userAdded) {
      return res.status(500).json({ message: "Error : creating user" });
    }
    userAdded.password = "";
    return res.status(201).json({
      message: "created",
      data: userAdded,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error " + err.message,
    });
  }
});

// delete a user
router.delete("/:id", verifyToken, async (req, res) => {
  const Id = new mongoose.Types.ObjectId(req.params.id);
  if (!Id) {
    return res.status(400).json({ message: "invalid parameter Id" });
  }

  const deleteduser = await Users.findByIdAndDelete({ _id: Id });
  if (!deleteduser) {
    return res
      .status(404)
      .json({ message: `Failed to Delete user, id :${Id}` });
  }

  // clear the cookies on the client side.
  res.clearCookie("token");
  res.clearCookie("refreshToken");

  return res.status(200).json({
    message: "user deleted",
    data: deleteduser._id,
  });
});

// update all details of user
router.put("/", verifyToken, async (req, res) => {
  try {
    // const Id = req.params.id;
    const { Id, name, email, phone } = req.body;

    if (!mongoose.Types.ObjectId.isValid(Id)) {
      return res.status(400).json({ message: "invalid Id" });
    }

    // validate the values from req body
    if (
      !name ||
      name.trim() == "" ||
      !email ||
      email.trim() == "" ||
      !phone ||
      isNaN(phone)
    ) {
      return res.status(400).json({
        message: "Invalid data in json body",
      });
    }

    // update in the DB
    const userupdated = await User.findByIdAndUpdate(
      Id,
      {
        name: name,
        email: email,
        phone: phone,
      },
      { new: true, runValidators: true },
    );

    if (!userupdated) {
      return res.status(404).json({
        message: "User not Found",
      });
    }

    return res.status(200).json({ message: "updated", user: userupdated });
  } catch (err) {
    return res.status(500).json({ message: "server error " + err.message });
  }
});

module.exports = router;
