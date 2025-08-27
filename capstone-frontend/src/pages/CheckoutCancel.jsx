import React from "react";
import { useNavigate } from "react-router";

const CheckoutCancel = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <div className="mb-4 text-6xl">❌</div>
      <h1 className="mb-2 text-3xl font-bold text-red-600">
        Payment Cancelled
      </h1>
      <p className="mb-6 text-lg text-gray-700">
        Your payment was not completed. Please try again or contact support if
        you need help.
      </p>
      <div className="flex gap-4">
        <button
          className="px-6 py-2 text-white bg-red-500 rounded shadow hover:bg-red-600"
          onClick={() => navigate("/checkout")}
        >
          Retry Payment
        </button>
        <button
          className="px-6 py-2 text-gray-800 bg-gray-300 rounded shadow hover:bg-gray-400"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default CheckoutCancel;
