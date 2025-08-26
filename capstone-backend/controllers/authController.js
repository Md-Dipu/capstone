const User = require("../models/User");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");
const { env } = require("../config/env");

const cookieOptions = {
  httpOnly: true,
  secure: env.server.env === "production",
  sameSite: "strict",
  domain: env.cookies.domain,
  path: "/",
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({ name, email, password });

    res
      .status(201)
      .json({
        message: "User created",
        user: { id: user._id, email: user.email },
      });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = signAccessToken({ id: user._id, role: user.role });
    const refreshToken = signRefreshToken({ id: user._id });

    res.cookie(env.cookies.refreshCookieName, refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      accessToken,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Signin failed", error: err.message });
  }
};

exports.refresh = async (req, res) => {
  try {
    const token = req.cookies[env.cookies.refreshCookieName];
    if (!token) return res.status(401).json({ message: "No refresh token" });

    const payload = verifyRefreshToken(token);
    const accessToken = signAccessToken({ id: payload.id, role: payload.role });

    res.json({ accessToken });
  } catch {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie(env.cookies.refreshCookieName, cookieOptions);
  res.json({ message: "Logged out" });
};
