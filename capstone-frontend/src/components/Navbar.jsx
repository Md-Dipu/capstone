import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useCartStore } from "../store/CartStore";
import { useAuthStore } from "../store/AuthStore";
import Cart from "./Cart";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { user, logout } = useAuthStore();
  // cartItems not needed in Navbar, only total and count are used
  const total = useCartStore((s) => s.total());
  const count = useCartStore((s) => s.count());
  const navigate = useNavigate();
  // total and count are now from store selectors

  return (
    <nav className="z-10 w-full bg-white shadow-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center flex-shrink-0">
            <h1 className="text-xl font-bold text-gray-800">Capstone</h1>
          </div>
          <div className="items-center hidden space-x-6 md:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 ${
                  isActive ? "underline" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 ${
                  isActive ? "underline" : ""
                }`
              }
            >
              Products
            </NavLink>
            <button
              type="button"
              className="relative font-medium text-gray-700 transition-colors duration-200 hover:text-blue-600"
              onClick={() => setCartOpen(true)}
            >
              Checkout ${total.toFixed(2)}
              {count > 0 && (
                <span className="absolute -top-2 -right-4 bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                  {count}
                </span>
              )}
            </button>

            {!user ? (
              <>
                <NavLink
                  to="/signin"
                  className={({ isActive }) =>
                    `text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 ${
                      isActive ? "underline" : ""
                    }`
                  }
                >
                  Signin
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 ${
                      isActive ? "underline" : ""
                    }`
                  }
                >
                  Signup
                </NavLink>
              </>
            ) : (
              <>
                {user.role === "admin" && (
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 ${
                        isActive ? "underline" : ""
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                )}
                <button
                  onClick={() => logout()}
                  className="font-medium text-gray-700 transition-colors duration-200 hover:text-blue-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="bg-white shadow-lg md:hidden">
          <div className="flex flex-col px-2 pt-2 pb-3 space-y-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200 ${
                  isActive ? "underline" : ""
                }`
              }
            >
              Home
            </NavLink>
            <button
              type="button"
              className="block px-3 py-2 text-base font-medium text-gray-700 transition-colors duration-200 rounded-md hover:text-blue-600 hover:bg-gray-100"
              onClick={() => setCartOpen(true)}
            >
              Checkout ${total.toFixed(2)}
              {count > 0 && (
                <span className="ml-2 bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                  {count}
                </span>
              )}
            </button>
            {/* Add more NavLinks here as needed */}
          </div>
        </div>
      )}

      {/* Cart Side Panel */}
      <div>
        {/* Only show overlay and cart if open */}
        <div
          className={`fixed inset-0 z-40 transition-opacity duration-300 ${
            cartOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          style={{
            background: cartOpen ? "rgba(229, 231, 235, 0.4)" : "transparent",
          }}
          onClick={() => setCartOpen(false)}
          aria-label="Close cart overlay"
        />
        <Cart
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          onCheckout={() => {
            setCartOpen(false);
            navigate("/checkout");
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
