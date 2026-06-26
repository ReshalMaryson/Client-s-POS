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
} = require("../controllers/userController");

//-------routes---------//

// get all users
router.get("/", verifyToken, isAdmin, allUsers);

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

//get the details of the user logged in currently.
// router.get("/me", verifyToken, async (req, res) => {
//   //res.send("hehe");
//   try {
//     const me = await Users.findById(req.id).populate("roleid");
//     if (!me) {
//       return res.status(404).json({ message: "user not found" });
//     }
//     return res.status(200).json({
//       user: me,
//     });
//   } catch (err) {
//     return res.status(500).json({ error: err });
//   }
// });
