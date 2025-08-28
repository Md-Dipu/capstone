const paymentColors = {
  pending: "#f59e42", // orange
  completed: "#22c55e", // green
  failed: "#ef4444", // red
};
import React, { useEffect, useState } from "react";
import {
  getOrders,
  deleteOrder,
  updateOrder,
} from "../../services/OrderService";

const OrderDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getOrders();
      setOrders(res.data || res.orders || []);
    } catch (err) {
      setError(err.message || "Failed to fetch orders");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    setLoading(true);
    setError("");
    try {
      await deleteOrder(id);
      fetchOrders();
    } catch (err) {
      setError(err.message || "Delete failed");
    }
    setLoading(false);
  };

  const statusOptions = [
    { value: "processing", color: "#3b82f6" }, // blue
    { value: "shipped", color: "#f59e42" }, // orange
    { value: "delivered", color: "#22c55e" }, // green
    { value: "cancelled", color: "#ef4444" }, // red
  ];

  const handleStatusChange = async (orderId, newStatus) => {
    setLoading(true);
    setError("");
    try {
      await updateOrder(orderId, { status: newStatus });
      fetchOrders();
    } catch (err) {
      setError(err.message || "Update failed");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h2 className="mb-4 text-xl font-bold">Order Management</h2>
      {error && <div className="mb-2 text-red-500">{error}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Order ID</th>
              <th className="px-4 py-2 border">User</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Payment</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-4 text-center">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-4 py-2 border">{order._id}</td>
                  <td className="px-4 py-2 border">
                    {order.user?.email || order.user?._id || "-"}
                  </td>
                  <td className="px-4 py-2 border">${order.amount}</td>
                  <td className="px-4 py-2 border">
                    {(() => {
                      const opt = statusOptions.find(
                        (s) => s.value === order.status
                      );
                      return (
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                            minWidth: "110px",
                          }}
                        >
                          <select
                            className="px-2 py-1 border rounded focus:outline-none"
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order._id, e.target.value)
                            }
                            disabled={loading}
                            style={{
                              background: opt?.color || "#e5e7eb",
                              color: "#fff",
                              fontWeight: "bold",
                              border: "1px solid #d1d5db",
                              minWidth: "110px",
                              textAlign: "center",
                              appearance: "none",
                              cursor: loading ? "not-allowed" : "pointer",
                              boxShadow: "0 1px 4px 0 rgba(0,0,0,0.08)",
                              paddingRight: "2rem",
                              transition: "box-shadow 0.2s",
                            }}
                          >
                            {statusOptions.map((o) => (
                              <option
                                key={o.value}
                                value={o.value}
                                style={{
                                  color: o.color,
                                  background: "#fff",
                                  fontWeight: "bold",
                                }}
                              >
                                {o.value.charAt(0).toUpperCase() +
                                  o.value.slice(1)}
                              </option>
                            ))}
                          </select>
                          {/* Chevron icon */}
                          <span
                            style={{
                              pointerEvents: "none",
                              position: "absolute",
                              right: "0.75rem",
                              top: "50%",
                              transform: "translateY(-50%)",
                              color: "#fff",
                              fontSize: "1rem",
                              opacity: loading ? 0.5 : 0.9,
                            }}
                          >
                            ▼
                          </span>
                        </div>
                      );
                    })()}
                  </td>
                  <td className="px-4 py-2 border">
                    <span
                      style={{
                        background: paymentColors[order.payment] || "#e5e7eb",
                        color: "#fff",
                        borderRadius: "0.25rem",
                        padding: "0.15rem 0.5rem",
                        fontWeight: "bold",
                        fontSize: "0.95em",
                        minWidth: "90px",
                        display: "inline-block",
                        textAlign: "center",
                        textTransform: "capitalize",
                      }}
                    >
                      {order.payment}
                    </span>
                  </td>
                  <td className="flex gap-2 px-4 py-2 border">
                    <button
                      className="px-2 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                      onClick={() => handleDelete(order._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDashboard;
