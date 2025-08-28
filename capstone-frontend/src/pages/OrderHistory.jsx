import React, { useEffect, useState } from "react";
import { getOrders } from "../services/OrderService";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getOrders();
        setOrders(res.data);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            err.message ||
            "Failed to fetch orders."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-lg text-gray-600">Loading order history...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-red-500">{error}</span>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-gray-500">No orders found.</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl px-4 py-8 mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Order History</h2>
      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="p-6 bg-white border rounded-lg shadow-sm"
          >
            <div className="flex flex-col mb-4 md:flex-row md:justify-between md:items-center">
              <div>
                <span className="font-semibold text-gray-700">Order ID:</span>
                <span className="ml-2 text-gray-600">{order._id}</span>
              </div>
              <div className="mt-2 md:mt-0">
                <span className="font-semibold text-gray-700">Date:</span>
                <span className="ml-2 text-gray-600">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-3 py-2 font-semibold text-left text-gray-700">
                      Product
                    </th>
                    <th className="px-3 py-2 font-semibold text-left text-gray-700">
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((item, idx) => (
                    <tr
                      key={item.product?._id || idx}
                      className="border-b last:border-b-0"
                    >
                      <td className="px-3 py-2">
                        {item.product?.name || "[Deleted Product]"}
                      </td>
                      <td className="px-3 py-2">{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col mt-4 md:flex-row md:justify-between md:items-center">
              <div>
                <span className="font-semibold text-gray-700">
                  Total Amount:
                </span>
                <span className="ml-2 text-gray-800">
                  ${order.amount.toFixed(2)}
                </span>
              </div>
              <div className="mt-2 md:mt-0">
                <span className="font-semibold text-gray-700">Payment:</span>
                <span
                  className={`ml-2 font-medium ${
                    order.payment === "completed"
                      ? "text-green-600"
                      : order.payment === "failed"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {order.payment.charAt(0).toUpperCase() +
                    order.payment.slice(1)}
                </span>
                <span className="ml-4 font-semibold text-gray-700">
                  Status:
                </span>
                <span
                  className={`ml-2 font-medium ${
                    order.status === "delivered"
                      ? "text-green-600"
                      : order.status === "cancelled"
                      ? "text-red-500"
                      : order.status === "shipped"
                      ? "text-blue-600"
                      : "text-yellow-500"
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
