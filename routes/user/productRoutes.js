const express = require("express");
const mongoose = require("mongoose");

// ==== IMPORT MODELS ====
const Product = mongoose.model("products");

module.exports = (app) => {
  // ==========================
  // ==== GET ALL PRODUCTS ====
  // ==========================
  app.get("/v1/user/product/get/all", async (req, res) => {
    console.log("==== GET ALL PRODUCTS ====\n Date: ", Date());
    try {
      const response = await Product.find({});
      res.json({ data: response });
    } catch (error) {
      console.log(
        "==== ERROR - GET ALL PRODUCTS ====\n Date: ",
        Date(),
        "\n",
        error
      );
      res.status(500).json({ error: "SERVER_ERROR" });
    }
  });

  // ==============================
  // ==== GET LIMITED PRODUCTS ====
  // ==============================
  app.get("/v1/user/product/get/limited/:limit", async (req, res) => {
    console.log("==== GET LIMITED PRODUCTS ====\n Date: ", Date());
    try {
      const limit = parseInt(req.params.limit);
      const response = await Product.find({}).limit(limit);
      res.json({ data: response });
    } catch (error) {
      console.log(
        "==== ERROR - GET LIMITED PRODUCTS ====\n Date: ",
        Date(),
        "\n",
        error
      );
      res.status(500).json({ error: "SERVER_ERROR" });
    }
  });
};
