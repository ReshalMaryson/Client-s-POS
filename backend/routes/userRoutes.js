const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// model
const Users = require("../models/userSchema");

// middlewares
const checkUserExists = require("../middlewares/user/checkUserExist");
const emailCheck = require("../middlewares/user/emailExists");
const verifyToken = require("../middlewares/auth/verifyJWT");
const { isAdmin } = require("../middlewares/auth/isAdminMiddleware");

//validators
const {
  createUserValidator,
  updateUserValidator,
} = require("../validators/userValidators");
const validate = require("../middlewares/user/userValidate");

// controller
const {
  getUserById,
  allUsers,
  createUser,
  deleteUser,
  updateUser,
  getVerifiedUser,
} = require("../controllers/userController");

//-------routes---------//

// get all users
router.get("/", verifyToken, isAdmin, allUsers);

// get the details of JWT verified user
router.get("/me", verifyToken, getVerifiedUser);

//get a user by id
router.get("/:id", verifyToken, checkUserExists, getUserById);

// create a user
router.post("/", createUserValidator, validate, emailCheck, createUser);

// delete a user
router.delete("/:id", verifyToken, isAdmin, deleteUser);

// update all details of user
router.put(
  "/:id",
  verifyToken,
  isAdmin,
  updateUserValidator,
  validate,
  updateUser,
);

module.exports = router;
