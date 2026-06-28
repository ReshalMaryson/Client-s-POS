const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//middlewaere
const verifyToken = require("../middlewares/auth/verifyJWT");

// controller
const { createSale } = require("../controllers/salesController");
// make a sale
router.post("/", verifyToken, createSale);

module.exports = router;
