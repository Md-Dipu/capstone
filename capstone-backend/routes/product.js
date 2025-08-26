const express = require("express");
const productController = require("../controllers/productController");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.post("/", auth("admin"), productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", auth("admin"), productController.updateProduct);
router.delete("/:id", auth("admin"), productController.deleteProduct);

module.exports = router;
