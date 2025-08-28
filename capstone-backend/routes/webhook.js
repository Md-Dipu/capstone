const express = require("express");
const Stripe = require("stripe");
const Order = require("../models/Order");
const { env } = require("../config/env");

const router = express.Router();
const stripe = new Stripe(env.stripe.secretKey);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }), // Important: raw body
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        env.stripe.webhookSecret
      );

      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        // Find order by session ID if you stored it
        // Or match user/amount
        const order = await Order.findOne({
          amount: session.amount_total / 100,
          payment: "pending",
        });
        if (order) {
          order.payment = "completed";
          order.status = "processing";
          await order.save();
        }
      }

      // Handle payment cancellation event
      if (
        event.type === "checkout.session.expired" ||
        event.type === "checkout.session.async_payment_failed"
      ) {
        const session = event.data.object;
        // Find order by session ID if you stored it
        // Or match user/amount
        const order = await Order.findOne({
          amount: session.amount_total / 100,
          payment: "pending",
        });
        if (order) {
          order.payment = "failed";
          order.status = "cancelled";
          await order.save();
        }
      }

      res.json({ received: true });
    } catch (err) {
      console.error("Webhook Error:", err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
);

module.exports = router;
