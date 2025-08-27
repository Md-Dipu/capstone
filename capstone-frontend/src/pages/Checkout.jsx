import { useCartStore } from "../store/CartStore";
import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "../services/PaymentService";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const { items, total } = useCartStore();

  const handleCheckout = async () => {
    const data = await createCheckoutSession(items);
    const stripe = await stripePromise;
    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-2 py-8 bg-gray-50">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-xl">
        <h1 className="mb-6 text-3xl font-bold text-center text-blue-700">
          Checkout
        </h1>
        <div className="mb-6 divide-y divide-gray-200">
          {items.length === 0 ? (
            <div className="py-8 text-center text-gray-400">
              Your cart is empty.
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between py-4"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">{item.name}</span>
                  <span className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </span>
                </div>
                <span className="font-semibold text-gray-700">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))
          )}
        </div>
        <div className="flex items-center justify-between p-4 mb-6 bg-gray-100 rounded-lg">
          <span className="text-lg font-semibold text-gray-700">Total</span>
          <span className="text-xl font-bold text-blue-600">
            ${total().toFixed(2)}
          </span>
        </div>
        <button
          onClick={handleCheckout}
          disabled={items.length === 0}
          className={`w-full px-4 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ${
            items.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow"
          }`}
        >
          Pay with Stripe
        </button>
      </div>
    </div>
  );
};

export default Checkout;
