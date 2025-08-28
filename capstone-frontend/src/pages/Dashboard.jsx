import React, { useEffect, useState } from "react";
import ProductDashboard from "../components/Dashboard/ProductDashboard";
import OrderDashboard from "../components/Dashboard/OrderDashboard";

const Dashboard = () => {
  const [hash, setHash] = useState(window.location.hash || "#products");

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash || "#products");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Admin Dashboard</h1>
      <div className="flex gap-4 mb-6">
        <a
          href="#products"
          className={`px-4 py-2 rounded ${
            hash === "#products"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Products
        </a>
        <a
          href="#orders"
          className={`px-4 py-2 rounded ${
            hash === "#orders"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Orders
        </a>
      </div>
      {hash === "#orders" ? <OrderDashboard /> : <ProductDashboard />}
    </div>
  );
};

export default Dashboard;
