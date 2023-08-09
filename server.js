const express = require("express");

const app = express();
app.use(express.json());

app.post("/v1/product/add", async (req, res) => {
  console.log(req.body);
  res.json({ value: "Hello World!" });
});

app.put("/v1/product/update", async (req, res) => {
  console.log(req.body);
  res.json({ value: "Hello World!" });
});

app.get("/v1/product/list/:name/:age", async (req, res) => {
  console.log(req.params);
  res.json({ value: "Hello World!" });
});

app.get("/echo", (req, res) => {
  res.json({ value: "Hello World!" });
});

app.listen(3000, (error) => {
  if (error) throw error;
  console.log("Server running on port 3000");
});

console.log("Hello World!");
