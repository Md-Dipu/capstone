const dotenv = require("dotenv");

dotenv.config();

const env = {
  server: {
    env: process.env.NODE_ENV || "development",
    port: parseInt(process.env.PORT, 10) || 3500,
    clientOrigin: process.env.CLIENT_ORIGIN,
  },
  database: {
    url: process.env.DB_URL,
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessTokenTtl: process.env.ACCESS_TOKEN_TTL,
    refreshTokenTtl: process.env.REFRESH_TOKEN_TTL,
  },
  cookies: {
    refreshCookieName: process.env.REFRESH_COOKIE_NAME,
    domain: process.env.COOKIE_DOMAIN,
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },
};

module.exports = { env };
