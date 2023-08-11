const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// ==== IMPORT MODELS ====
const User = mongoose.model("users");

// ==== IMPORT MIDDLEWARE ====
const { generateToken, isLoggedIn } = require("../../middleware/requireLogin");

module.exports = (app) => {
  // ==================
  // ==== REGISTER ====
  // ==================
  app.post("/v1/user/register", async (req, res) => {
    console.log("==== REGISTER ====\n Date: ", Date(), "\n", req.body);
    try {
      const { name, email, password } = req.body;
      console.log("1");

      const salt = await bcrypt.genSalt(10);

      const newPassword = await bcrypt.hash(password, salt);

      const user = new User({
        name,
        email,
        password: newPassword,
      });

      console.log("2");
      const response = await user.save();
      console.log(response);
      console.log("3");
      return res.json({ data: response });
    } catch (error) {
      console.log("==== ERROR - REGISTER ====\n Date: ", Date(), "\n", error);
      res.status(500).json({ error: "SERVER_ERROR" });
    }
  });

  // ===============
  // ==== LOGIN ====
  // ===============
  app.post("/v1/user/login", async (req, res) => {
    console.log("==== LOGIN ====\n Date: ", Date(), "\n", req.body);
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        email,
      });

      if (!user) {
        return res.status(401).json({
          error: "INVALID_EMAIL_OR_INVALID_PASSWORD",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          error: "INVALID_EMAIL_OR_INVALID_PASSWORD",
        });
      }

      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
      };

      const token = generateToken(payload);

      return res.json({ data: { token } });
    } catch (error) {
      console.log("==== ERROR - LOGIN ====\n Date: ", Date(), "\n", error);
      res.status(500).json({ error: "SERVER_ERROR" });
    }
  });

  // ======================
  // ==== CURRENT USER ====
  // ======================
  app.get("/v1/user/current", isLoggedIn, async (req, res) => {
    console.log("==== CURRENT USER ====\n Date: ", Date(), "\n", req.body);
    try {
      console.log(req.user);
      return res.json({ data: req.user });
    } catch (error) {
      console.log(
        "==== ERROR - CURRENT USER ====\n Date: ",
        Date(),
        "\n",
        error
      );
      res.status(500).json({ error: "SERVER_ERROR" });
    }
  });
};
