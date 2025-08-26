const express = require("express");
const {
  signup,
  signin,
  refresh,
  logout,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/refresh", refresh);
router.post("/logout", logout);

module.exports = router;
