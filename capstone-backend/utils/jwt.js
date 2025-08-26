const jwt = require("jsonwebtoken");
const { env } = require("../config/env");

const signAccessToken = (payload) => {
  return jwt.sign(payload, env.jwt.accessSecret, {
    expiresIn: env.jwt.accessTokenTtl,
  });
};

const signRefreshToken = (payload) => {
  return jwt.sign(payload, env.jwt.refreshSecret, {
    expiresIn: env.jwt.refreshTokenTtl,
  });
};

const verifyAccessToken = (token) => jwt.verify(token, env.jwt.accessSecret);
const verifyRefreshToken = (token) => jwt.verify(token, env.jwt.refreshSecret);

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
