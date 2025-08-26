const { verifyAccessToken } = require("../utils/jwt");

exports.protect = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
};
