const express = require("express");
const mongoose = require("mongoose");

// ==== IMPORT MODELS ====
const Product = mongoose.model("products");

module.exports = (app) => {
  // ==== ECHO ====
  app.get("/echo", (req, res) => {
    res.json({ value: "Hello World!" });
  });

  // ======================
  // ==== GET PRODUCTS ====
  // ======================
  app.get("/v1/product/list", async (req, res) => {
    console.log("==== GET PRODUCTS ====\n Date: ", Date());
    try {
      const response = await Product.find({});
      res.json({ data: response });
    } catch (error) {
      console.log(
        "==== ERROR - GET PRODUCTS ====\n Date: ",
        Date(),
        "\n",
        error
      );
      res.status(500).json({ error: "SERVER_ERROR" });
    }
  });

  // ===========================
  // ==== GET PRODUCT BY ID ====
  // ===========================
  app.get("/v1/product/id/:id", async (req, res) => {
    console.log("==== GET PRODUCTS ====\n Date: ", Date());
    try {
      const id = req.params.id;
      const response = await Product.findById(id);
      res.json({ data: response });
    } catch (error) {
      console.log(
        "==== ERROR - GET PRODUCTS ====\n Date: ",
        Date(),
        "\n",
        error
      );
      res.status(500).json({ error: "SERVER_ERROR" });
    }
  });

  // =====================
  // ==== ADD PRODUCT ====
  // =====================
  app.post("/v1/product/add", async (req, res) => {
    console.log("==== ADD PRODUCT ====\n Date: ", Date(), "\n", req.body);
    try {
      const {
        id,
        title,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        category,
        thumbnail,
        images,
      } = req.body;

      const product = new Product({
        id,
        title,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        category,
        thumbnail,
        images,
      });
      const response = await product.save();
      res.json({ data: response });
    } catch (error) {
      console.log(
        "==== ERROR - ADD PRODUCT ====\n Date: ",
        Date(),
        "\n",
        error
      );
      res.status(500).json({ error: "SERVER_ERROR" });
    }
  });

  // ========================
  // ==== UPDATE PRODUCT ====
  // ========================
  app.put("/v1/product/update", async (req, res) => {
    console.log("==== UPDATE PRODUCT ====\n Date: ", Date(), "\n", req.body);
    try {
      const {
        productId,
        title,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        category,
        thumbnail,
        images,
      } = req.body;

      const response = await Product.findByIdAndUpdate(productId, {
        $set: {
          title,
          description,
          price,
          discountPercentage,
          rating,
          stock,
          brand,
          category,
          thumbnail,
          images,
        },
      });

      res.json({ data: response });
    } catch (error) {
      console.log(
        "==== ERROR - UPDATE PRODUCT ====\n Date: ",
        Date(),
        "\n",
        error
      );
      res.status(500).json({ error: "SERVER_ERROR" });
    }
  });

  // ========================
  // ==== DELETE PRODUCT ====
  // ========================
  app.delete("/v1/product/delete/:id", async (req, res) => {
    console.log("==== DELETE PRODUCT ====\n Date: ", Date(), "\n", req.params);
    try {
      const id = req.params.id;
      const response = await Product.findByIdAndDelete(id);
      res.json({ data: response });
    } catch (error) {
      console.log(
        "==== ERROR - DELETE PRODUCT ====\n Date: ",
        Date(),
        "\n",
        error
      );
      res.status(500).json({ error: "SERVER_ERROR" });
    }
  });
};
