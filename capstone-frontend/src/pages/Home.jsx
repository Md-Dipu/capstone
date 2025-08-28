import React, { useEffect, useState } from "react";
import { getProducts } from "../services/ProductService";
import heroImg from "../assets/hero-banner.svg";
import electronicsImg from "../assets/categories/electronics.svg";
import fashionImg from "../assets/categories/fashion.svg";
import homeImg from "../assets/categories/home.svg";
import toysImg from "../assets/categories/toys.svg";
import Card from "../components/Card";
import user1 from "../assets/testimonials/user1.svg";
import user2 from "../assets/testimonials/user2.svg";
import user3 from "../assets/testimonials/user3.svg";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  useEffect(() => {
    getProducts({ limit: 4, sort: "-createdAt" })
      .then((res) => setFeatured(res.products || []))
      .catch(() => setFeatured([]));
  }, []);

  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="flex flex-col-reverse items-center justify-between w-full px-6 py-16 bg-white md:flex-row md:px-20">
        <div className="flex flex-col items-start flex-1 gap-6 text-center md:text-left">
          <h1 className="text-4xl font-extrabold leading-tight text-gray-800 md:text-5xl">
            Shop the Latest Trends
            <br />
            <span className="text-purple-600">Smart, Fast & Secure</span>
          </h1>
          <p className="max-w-lg text-lg text-gray-600 md:text-xl">
            Explore thousands of products at unbeatable prices. Fashion,
            electronics, home essentials and more—all in one place.
          </p>
          <a
            href="/products"
            className="px-6 py-3 font-semibold text-white transition bg-purple-600 rounded-lg shadow hover:bg-purple-700"
          >
            Start Shopping
          </a>
        </div>
        <div className="flex justify-center flex-1 mb-8 md:mb-0">
          <img
            src={heroImg}
            alt="E-commerce Hero"
            className="w-80 md:w-[28rem] drop-shadow-xl"
          />
        </div>
      </section>
      {/* Categories Section */}
      <section className="w-full max-w-6xl px-4 mt-16">
        <h2 className="mb-8 text-2xl font-bold text-center text-gray-800 md:text-3xl">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { name: "Electronics", img: electronicsImg },
            { name: "Fashion", img: fashionImg },
            { name: "Home", img: homeImg },
            { name: "Toys", img: toysImg },
          ].map((cat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-4 transition bg-white shadow cursor-pointer rounded-xl hover:scale-105"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="object-cover w-full h-32 mb-3 rounded-lg"
              />
              <span className="font-semibold text-gray-700">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>
      {/* Featured Products */}
      <section className="w-full max-w-6xl px-4 mt-20">
        <h2 className="mb-8 text-2xl font-bold text-center text-gray-800 md:text-3xl">
          Featured Products
        </h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {featured.length === 0 ? (
            <div className="col-span-4 text-center text-gray-400">
              No products found.
            </div>
          ) : (
            featured.map((product) => (
              <Card key={product._id} product={product} />
            ))
          )}
        </div>
      </section>
      {/* Testimonials */}
      <section className="w-full max-w-5xl px-4 mt-20">
        <h2 className="mb-8 text-2xl font-bold text-center text-gray-800 md:text-3xl">
          What Customers Say
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              img: user1,
              name: "Priya S.",
              message:
                "Amazing service and quality! My order arrived earlier than expected. Will shop again.",
            },
            {
              img: user2,
              name: "Rahul D.",
              message:
                "The variety is fantastic and checkout was super easy. Highly recommended!",
            },
            {
              img: user3,
              name: "Ananya M.",
              message:
                "Customer support was very helpful. Love the deals and fast shipping.",
            },
          ].map((user, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-6 text-center bg-white shadow rounded-xl"
            >
              <img
                src={user.img}
                alt={user.name}
                className="w-16 h-16 mb-4 rounded-full"
              />
              <p className="mb-4 text-gray-600">“{user.message}”</p>
              <span className="font-semibold text-purple-600">
                — {user.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-3xl px-4 mt-20 mb-12">
        <div className="flex flex-col items-center p-8 bg-purple-600 shadow-lg rounded-2xl">
          <h2 className="mb-2 text-2xl font-bold text-center text-white">
            Stay Updated!
          </h2>
          <p className="mb-4 text-center text-purple-100">
            Subscribe to get exclusive deals & new arrivals.
          </p>
          <form className="flex flex-col w-full max-w-md gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 font-semibold text-purple-700 bg-white rounded-lg shadow hover:bg-gray-100"
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
