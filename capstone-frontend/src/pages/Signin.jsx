import { useState } from "react";
import { useAuthStore } from "../store/AuthStore";

export default function Signin() {
  const { user, signin } = useAuthStore();
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await signin(form);
      setMsg("Signin success");
    } catch (err) {
      setMsg(err.response?.data?.message || "Signin failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-gradient-to-br from-blue-100 to-purple-200">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl"
      >
        <h2 className="mb-2 text-3xl font-bold text-center text-purple-700">
          Sign In
        </h2>
        <div className="space-y-4">
          <input
            className="w-full px-4 py-2 transition border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className="w-full px-4 py-2 transition border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 font-semibold text-white transition bg-purple-600 rounded-lg shadow hover:bg-purple-700"
        >
          Sign In
        </button>
        {msg && (
          <p
            className={`text-center text-sm mt-2 ${
              msg.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {msg}
          </p>
        )}
        {user && (
          <p className="mt-2 font-medium text-center text-purple-700">
            Welcome {user.email}
          </p>
        )}
      </form>
    </div>
  );
}
