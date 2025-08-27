import React from "react";
import { useCartStore } from "../store/CartStore";

const Cart = ({ open, onClose, onCheckout }) => {
  const removeItem = useCartStore((s) => s.removeItem);
  const addItem = useCartStore((s) => s.addItem);
  const cartItems = useCartStore((s) => s.cartItems());
  const total = useCartStore((s) => s.total());

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transition-transform duration-500 ease-in-out ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ maxWidth: "90vw", willChange: "transform" }}
      tabIndex={-1}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-bold">Your Cart</h2>
        <button
          onClick={onClose}
          className="text-2xl leading-none text-gray-500 hover:text-gray-800"
        >
          ×
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500">Cart is empty</div>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item._id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500">
                    ${item.price.toFixed(2)} x {item.quantity || 1}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="px-2 py-1 text-lg font-bold border rounded hover:bg-gray-100"
                    onClick={() => removeItem(item._id)}
                    aria-label="Remove one"
                  >
                    -
                  </button>
                  <span>{item.quantity || 1}</span>
                  <button
                    className="px-2 py-1 text-lg font-bold border rounded hover:bg-gray-100"
                    onClick={() => addItem(item)}
                    aria-label="Add one"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="p-4 border-t">
        <div className="flex justify-between mb-2 font-bold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          className="w-full py-2 text-white transition-colors duration-200 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
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
