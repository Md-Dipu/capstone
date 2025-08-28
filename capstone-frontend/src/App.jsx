import React from "react";
import { Route, Routes } from "react-router";
import Protected from "./components/Protected";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutCancel from "./pages/CheckoutCancel";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <section className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/checkout"
          element={
            <Protected>
              <Checkout />
            </Protected>
          }
        />
        <Route
          path="/checkout/success"
          element={
            <Protected>
              <CheckoutSuccess />
            </Protected>
          }
        />
        <Route
          path="/checkout/cancel"
          element={
            <Protected>
              <CheckoutCancel />
            </Protected>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </section>
  );
};

export default App;
