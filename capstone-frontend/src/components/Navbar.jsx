import React, { useState } from "react";
import { NavLink } from "react-router";
import { useCartStore } from "../store/CartStore";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, handleLogout } = useAuth();
  const { items } = useCartStore();
  const totalPrice = items?.reduce((total, item) => total + item.price, 0);

  return (
    <nav className="bg-white shadow-md w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-xl font-bold text-gray-800">Capstone</h1>
          </div>
          <div className="hidden md:flex space-x-6 items-center">
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
              to="#"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Checkout ${totalPrice}
            </NavLink>

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
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Logout
              </button>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
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
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col">
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
            <NavLink
              to="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
            >
              Checkout ${totalPrice}
            </NavLink>
            {/* Add more NavLinks here as needed */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
