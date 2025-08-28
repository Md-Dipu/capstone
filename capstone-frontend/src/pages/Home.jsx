import React from "react";

const Home = () => {
  return (
    <main className="w-full min-h-[80vh] bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center">
      {/* Hero Banner */}
      <section className="flex flex-col items-center justify-between w-full px-6 py-12 bg-white shadow-md md:flex-row md:px-16 rounded-b-3xl">
        <div className="flex flex-col items-start flex-1 gap-6">
          <h1 className="text-4xl font-extrabold leading-tight text-gray-800 md:text-5xl">
            Discover the Best Deals
            <br />
            <span className="text-purple-600">Shop Smart, Live Better</span>
          </h1>
          <p className="max-w-lg text-lg text-gray-600 md:text-xl">
            Your one-stop e-commerce destination for electronics, fashion, home
            essentials, and more. Enjoy fast delivery, secure payments, and
            exclusive offers!
          </p>
          <a
            href="/products"
            className="inline-block px-6 py-3 font-semibold text-white transition bg-purple-600 rounded-lg shadow hover:bg-purple-700"
          >
            Shop Now
          </a>
        </div>
        <div className="flex justify-center flex-1 mt-8 md:mt-0">
          <img
            src="/vite.svg"
            alt="E-commerce Banner"
            className="w-72 md:w-96 drop-shadow-xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="grid w-full max-w-6xl grid-cols-1 gap-8 px-4 mt-12 md:grid-cols-3">
        <div className="flex flex-col items-center p-6 text-center transition bg-white shadow rounded-xl hover:scale-105">
          <svg
            className="w-12 h-12 mb-4 text-purple-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m4-9l2 9"
            />
          </svg>
          <h3 className="mb-2 text-lg font-bold">Wide Product Range</h3>
          <p className="text-gray-500">
            Find everything you need from top brands in one place.
          </p>
        </div>
        <div className="flex flex-col items-center p-6 text-center transition bg-white shadow rounded-xl hover:scale-105">
          <svg
            className="w-12 h-12 mb-4 text-purple-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 12v4m8-8h-4m-8 0H4"
            />
          </svg>
          <h3 className="mb-2 text-lg font-bold">Best Prices & Offers</h3>
          <p className="text-gray-500">
            Enjoy unbeatable prices and exclusive discounts every day.
          </p>
        </div>
        <div className="flex flex-col items-center p-6 text-center transition bg-white shadow rounded-xl hover:scale-105">
          <svg
            className="w-12 h-12 mb-4 text-purple-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17v-2a4 4 0 018 0v2M5 21h14a2 2 0 002-2v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2z"
            />
          </svg>
          <h3 className="mb-2 text-lg font-bold">Secure & Fast Delivery</h3>
          <p className="text-gray-500">
            Shop with confidence and get your orders delivered quickly.
          </p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="flex flex-col items-center justify-between w-full max-w-4xl gap-8 px-4 py-10 mt-16 bg-purple-600 shadow-lg rounded-2xl md:flex-row">
        <div className="flex-1">
          <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">
            Ready to start shopping?
          </h2>
          <p className="mb-4 text-lg text-white">
            Sign up now and get access to exclusive member deals!
          </p>
          <a
            href="/signup"
            className="inline-block px-6 py-3 font-semibold text-purple-700 transition bg-white rounded-lg shadow hover:bg-gray-100"
          >
            Create Account
          </a>
        </div>
        <div className="flex justify-center flex-1">
          <img
            src="/src/assets/react.svg"
            alt="Join Us"
            className="w-32 md:w-40"
          />
        </div>
      </section>

      {/* Featured Categories */}
      <section className="w-full max-w-6xl px-4 mt-8">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800 md:text-3xl">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="flex flex-col items-center p-4 transition bg-white shadow cursor-pointer rounded-xl hover:scale-105">
            <span className="mb-2 text-3xl">📱</span>
            <span className="font-semibold text-gray-700">Electronics</span>
          </div>
          <div className="flex flex-col items-center p-4 transition bg-white shadow cursor-pointer rounded-xl hover:scale-105">
            <span className="mb-2 text-3xl">👗</span>
            <span className="font-semibold text-gray-700">Fashion</span>
          </div>
          <div className="flex flex-col items-center p-4 transition bg-white shadow cursor-pointer rounded-xl hover:scale-105">
            <span className="mb-2 text-3xl">🏠</span>
            <span className="font-semibold text-gray-700">Home</span>
          </div>
          <div className="flex flex-col items-center p-4 transition bg-white shadow cursor-pointer rounded-xl hover:scale-105">
            <span className="mb-2 text-3xl">🧸</span>
            <span className="font-semibold text-gray-700">Toys</span>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full max-w-4xl px-4 mt-16">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800 md:text-3xl">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center p-6 text-center bg-white shadow rounded-xl">
            <p className="mb-4 text-gray-600">
              “Amazing selection and super fast delivery. My go-to online
              store!”
            </p>
            <span className="font-semibold text-purple-600">— Sarah K.</span>
          </div>
          <div className="flex flex-col items-center p-6 text-center bg-white shadow rounded-xl">
            <p className="mb-4 text-gray-600">
              “Great prices and excellent customer service. Highly recommend!”
            </p>
            <span className="font-semibold text-purple-600">— James L.</span>
          </div>
          <div className="flex flex-col items-center p-6 text-center bg-white shadow rounded-xl">
            <p className="mb-4 text-gray-600">
              “Easy to use website and lots of deals. Love shopping here!”
            </p>
            <span className="font-semibold text-purple-600">— Priya S.</span>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="w-full max-w-3xl px-4 mt-16 mb-10">
        <div className="flex flex-col items-center p-8 bg-white shadow-lg rounded-2xl">
          <h2 className="mb-2 text-2xl font-bold text-center text-gray-800">
            Stay Updated!
          </h2>
          <p className="mb-4 text-center text-gray-600">
            Subscribe to our newsletter for the latest deals and updates.
          </p>
          <form className="flex flex-col justify-center w-full max-w-md gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 font-semibold text-white transition bg-purple-600 rounded-lg shadow hover:bg-purple-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Home;
