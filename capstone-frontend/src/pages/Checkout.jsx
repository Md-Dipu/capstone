import { useCartStore } from "../store/CartStore";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useAuthStore } from "../store/AuthStore";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
  const { items, total } = useCartStore();
  const { accessToken } = useAuthStore();

  const handleCheckout = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}payment/create-checkout-session`,
        { cartItems: items, userId: "USER_ID_FROM_AUTH" },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const stripe = await stripePromise;
      stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl">Checkout</h1>
      {items.map((item) => (
        <div key={item._id} className="flex justify-between">
          <span>
            {item.name} (x{item.quantity})
          </span>
          <span>${item.price * item.quantity}</span>
        </div>
      ))}
      <h2 className="mt-4 text-xl">Total: ${total()}</h2>
      <button
        onClick={handleCheckout}
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
      >
        Pay with Stripe
      </button>
    </div>
  );
}
