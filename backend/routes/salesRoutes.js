const express = require("express");
const router = express.Router();

//middlewaere
const verifyToken = require("../middlewares/auth/verifyJWT");
const { isAdmin } = require("../middlewares/auth/isAdminMiddleware");

// controller
const { getAllSales, createSale } = require("../controllers/salesController");

//get all sales
router.get("/", verifyToken, isAdmin, getAllSales);

// make a sale
router.post("/", verifyToken, createSale);

module.exports = router;
