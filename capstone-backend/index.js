const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { env } = require("./config/env");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const paymentRoutes = require("./routes/payment");

const app = express();

const webhookRoutes = require("./routes/webhook");
app.use("/stripe", webhookRoutes);

app.use(cors({ origin: env.server.clientOrigin, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Capstone Backend API");
});

// Connect to MongoDB
mongoose
  .connect(env.database.url)
  .then(() => {
    app.listen(env.server.port, () => {
      if (env.server.env !== "production") {
        console.log(`Server running on http://localhost:${env.server.port}`);
      }
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
