const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/env");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the Capstone Backend API");
});

app.get("/products", async (req, res) => {
  try {
    const products = [
      { id: 1, name: "Product 1", price: 100 },
      { id: 2, name: "Product 2", price: 200 },
      { id: 3, name: "Product 3", price: 300 },
    ];
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Connect to MongoDB
mongoose
  .connect(config.dbUrl)
  .then(() => {
    app.listen(config.port, () => {
      if (config.env !== "production") {
        console.log(`Server running on http://localhost:${config.port}`);
      }
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
