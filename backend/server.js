const express = require("express");
const server = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const ConnectDB = require("./db/db");

// routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const salesRoutes = require("./routes/salesRoutes");

//middlewares
server.use(express.json());
server.use(cookieParser());

// db connect
ConnectDB();

// routes middleware
server.use("/auth", authRoutes);
server.use("/users", userRoutes);
server.use("/products", productRoutes);
server.use("/sales", salesRoutes);

//server start
server.listen(8000, () => {
  console.log("live");
  //   console.log(mongoose.modelNames());
});
