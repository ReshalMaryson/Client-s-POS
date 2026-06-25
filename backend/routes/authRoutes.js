const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// schema
const Users = require("../models/userSchema");
const refreshTokenSchema = require("../models/refreshTokenSchema");

router.post("/login", async (req, res) => {
  try {
    const { email, pass } = req.body;

    if (!pass || pass.trim() == "" || !email || email.trim() == "") {
      return res.status(400).json({ message: "missing required fields" });
    }

    //fetch user by email
    const user = await Users.findOne({ email: email })
      .select("+password")
      .populate("roleid");
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    // check the password
    const verified = await bcrypt.compare(pass, user.password);
    if (!verified) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    // creating JWT for current user logged in.
    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1m", // initial jwt expriy time for testing purpose.
      },
    );

    // Refresh Token for the current user.
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "1d",
      },
    );

    // save refresh token in the DB
    if (refreshToken) {
      refreshTokenSchema.create({
        id: user._id,
        token: refreshToken,
      });
    }

    // save access token in cookie
    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: false, // false for dev...true for deploy
      sameSite: "strict",
      maxAge: 3 * 60 * 1000, // mins* secs in mins * ms
    });

    // save refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // false for dev...true for deploy
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000, // days * hours per day*mins in hours* secs in mins * ms
    });

    // payload for the response
    const resUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.roleid,
    };

    // success response
    return res.status(200).json({ message: "login successful", data: resUser });
  } catch (err) {
    return res.status(500).json({ message: "server error " + err.message });
  }
});

// --------------logout with JWT + sessions + cookies + refresh token---------
router.post("/logout", async (req, res) => {
  // get current refresh token
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    await refreshTokenSchema.deleteOne({
      token: refreshToken,
    });
  }

  res.clearCookie("token");
  res.clearCookie("refreshToken");

  return res.status(200).json({
    message: "Logged out successfully",
  });
});

// -------------refresh token route----------------
router.post("/refresh", async (req, res) => {
  const rt = req.cookies.refreshToken;

  if (!rt) {
    return res.status(401).json({
      message: "Refresh token missing",
    });
  }

  try {
    // verify
    const tokenVerfiy = jwt.verify(rt, process.env.JWT_REFRESH_SECRET);

    // check Token in DB
    const tokenExist = await refreshTokenSchema.findOne({ token: rt });

    if (!tokenExist) {
      return res.status(403).json({
        message: "Invalid refresh token",
      });
    }

    // release a new token
    const newAccessToken = jwt.sign(
      { id: tokenVerfiy.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "3m",
      },
    );

    // set new access token in cookies
    res.cookie("token", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Access token refreshed",
    });
  } catch (err) {
    return res.status(403).json({
      message: err.message,
    });
  }
});

module.exports = router;
