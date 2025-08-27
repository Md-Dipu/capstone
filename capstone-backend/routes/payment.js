const express = require("express");
const Stripe = require("stripe");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { env } = require("../config/env");
const { auth } = require("../middleware/auth");

const router = express.Router();
const stripe = new Stripe(env.stripe.secretKey);

// Create checkout session
router.post("/create-checkout-session", auth(), async (req, res) => {
  try {
    const { cartItems } = req.body;

    // Map cart items into Stripe line items
    const line_items = await Promise.all(
      cartItems.map(async (item) => {
        const product = await Product.findById(item._id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              images: [product.imageUrl],
            },
            unit_amount: product.price * 100, // cents
          },
          quantity: item.quantity,
        };
      })
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${env.server.clientOrigin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.server.clientOrigin}/checkout/cancel`,
    });

    // Save order in DB with pending status
    const order = new Order({
      user: req.user.id,
      products: cartItems.map((i) => ({
        product: i._id,
        quantity: i.quantity,
      })),
      amount: Number(
        cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)
      ),
      payment: "pending",
    });
    await order.save();

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
