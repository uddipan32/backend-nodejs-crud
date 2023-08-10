const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
app.use(express.json());

// ==== DB CONNECT ====
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  });

// ==== MODELS ====
require("./models/Product");

// ==== ROUTES ====
require("./routes/admin/productRoutes")(app);
require("./routes/user/productRoutes")(app);

app.listen(3000, (error) => {
  if (error) throw error;
  console.log("Server running on port 3000");
});
