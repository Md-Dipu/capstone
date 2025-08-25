const dotenv = require("dotenv");

dotenv.config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT, 10) || 3500,
  dbUrl: process.env.DB_URL,
};

module.exports = config;
