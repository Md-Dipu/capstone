import React from "react";
import { useCartStore } from "../store/CartStore";

const Cart = ({ open, onClose, onCheckout }) => {
  const removeItem = useCartStore((s) => s.removeItem);
  const addItem = useCartStore((s) => s.addItem);
  const cartItems = useCartStore((s) => s.cartItems());
  const total = useCartStore((s) => s.total());

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transition-transform duration-500 ease-in-out flex flex-col ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ maxWidth: "95vw", willChange: "transform" }}
      tabIndex={-1}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
        <h2 className="text-xl font-bold tracking-wide text-gray-800">
          🛒 Your Cart
        </h2>
        <button
          onClick={onClose}
          className="flex items-center justify-center w-10 h-10 text-3xl leading-none text-gray-400 transition-colors duration-200 rounded-full hover:text-red-500 focus:outline-none"
          aria-label="Close cart"
        >
          ×
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 px-6 py-4 overflow-y-auto bg-white">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400">
            <span className="text-5xl">🛍️</span>
            <span className="text-lg font-medium">Your cart is empty</span>
            <span className="text-sm">Add some products to get started!</span>
          </div>
        ) : (
          <ul className="space-y-6">
            {cartItems.map((item) => (
              <li
                key={item._id}
                className="flex items-center justify-between gap-4 p-3 transition-shadow border border-gray-100 rounded-lg shadow-sm bg-gray-50 hover:shadow-md"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800 truncate">
                    {item.name}
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    ${item.price.toFixed(2)} each
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="flex items-center justify-center w-8 h-8 text-lg font-bold transition-colors bg-white border border-gray-300 rounded-full hover:bg-red-100 hover:text-red-600"
                    onClick={() => removeItem(item._id)}
                    aria-label="Remove one"
                  >
                    -
                  </button>
                  <span className="px-2 text-base font-medium text-gray-700">
                    {item.quantity || 1}
                  </span>
                  <button
                    className="flex items-center justify-center w-8 h-8 text-lg font-bold transition-colors bg-white border border-gray-300 rounded-full hover:bg-green-100 hover:text-green-600"
                    onClick={() => addItem(item)}
                    aria-label="Add one"
                  >
                    +
                  </button>
                </div>
                <div className="ml-4 text-right min-w-fit">
                  <span className="block text-sm font-semibold text-gray-700">
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Cart Footer */}
      <div className="px-6 py-5 border-t bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-gray-700">Total:</span>
          <span className="text-xl font-bold text-blue-700">
            ${total.toFixed(2)}
          </span>
        </div>
        <button
          className="w-full py-3 text-lg font-semibold text-white transition-colors duration-200 bg-blue-600 rounded-lg shadow hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={cartItems.length === 0}
          onClick={onCheckout}
        >
          Go to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
