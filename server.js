const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// ==== DB CONNECT ====
const MONGODB_URL =
  "mongodb+srv://uddipanbhatta7:V38gYZ4pNJjN7wLq@cluster0.gi6hewq.mongodb.net/crud";

mongoose
  .connect(MONGODB_URL, {
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
