const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { auth } = require("../middleware/auth");

router.get("/", auth(), orderController.getOrders);
router.get("/:id", auth(), orderController.getOrderById);
router.patch("/:id", auth("admin"), orderController.updateOrderStatus);
router.delete("/:id", auth("admin"), orderController.deleteOrder);

module.exports = router;
