const Order = require("../models/Order");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { products, amount } = req.body;
    const order = new Order({
      user: req.user.id,
      products,
      amount,
    });
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all orders (admin) or user's orders
exports.getOrders = async (req, res) => {
  try {
    let orders;
    if (req.user.role === "admin") {
      orders = await Order.find().populate("user").populate("products.product");
    } else {
      orders = await Order.find({ user: req.user.id }).populate(
        "products.product"
      );
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "products.product"
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (req.user.role !== "admin" && order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update order status (admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, payment } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (status) order.status = status;
    if (payment) order.payment = payment;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an order (admin only)
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
