import React, { useEffect } from "react";
import { useCartStore } from "../store/CartStore";
import { useNavigate } from "react-router";

const CheckoutSuccess = () => {
  const clearCart = useCartStore((s) => s.clearCart);
  const navigate = useNavigate();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <div className="mb-4 text-6xl">✅</div>
      <h1 className="mb-2 text-3xl font-bold text-green-600">
        Payment Successful!
      </h1>
      <p className="mb-6 text-lg text-gray-700">
        Your order is confirmed. Thank you for shopping with us!
      </p>
      <button
        className="px-6 py-2 text-white bg-green-500 rounded shadow hover:bg-green-600"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default CheckoutSuccess;
