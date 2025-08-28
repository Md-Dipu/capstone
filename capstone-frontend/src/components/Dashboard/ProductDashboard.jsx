import React, { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/ProductService";

const initialForm = {
  name: "",
  price: "",
  description: "",
  imageUrl: "",
  category: "",
};

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getProducts({
        limit: 0,
      });
      setProducts(res.products || []);
    } catch (err) {
      setError(err.message || "Failed to fetch products");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleAdd = () => {
    setForm(initialForm);
    setEditId(null);
    setShowForm(true);
  };
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      imageUrl: product.imageUrl || "",
      category: product.category,
    });
    setEditId(product._id);
    setShowForm(true);
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    setLoading(true);
    setError("");
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      setError(err.message || "Delete failed");
    }
    setLoading(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (editId) {
        await updateProduct(editId, form);
      } else {
        await createProduct(form);
      }
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      setError(err.message || "Save failed");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h2 className="mb-4 text-xl font-bold">Product Management</h2>
      {error && <div className="mb-2 text-red-500">{error}</div>}
      <button
        className="px-4 py-2 mb-4 text-white bg-blue-600 rounded hover:bg-blue-700"
        onClick={handleAdd}
      >
        Add Product
      </button>
      {showForm && (
        <form className="p-4 mb-6 bg-gray-100 rounded" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleInput}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Price</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleInput}
              className="w-full px-2 py-1 border rounded"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleInput}
              className="w-full px-2 py-1 border rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Image URL</label>
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleInput}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Category</label>
            <input
              name="category"
              value={form.category}
              onChange={handleInput}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
              disabled={loading}
            >
              {editId ? "Update" : "Add"} Product
            </button>
            <button
              type="button"
              className="px-4 py-2 text-white bg-gray-400 rounded hover:bg-gray-500"
              onClick={() => setShowForm(false)}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Image</th>
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
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-4 text-center">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id}>
                  <td className="px-4 py-2 border">{product.name}</td>
                  <td className="max-w-xs px-4 py-2 truncate border">
                    {product.description}
                  </td>
                  <td className="px-4 py-2 border">${product.price}</td>
                  <td className="px-4 py-2 border">{product.category}</td>
                  <td className="px-4 py-2 border">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="object-cover w-12 h-12 rounded"
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </td>
                  <td className="flex gap-2 px-4 py-2 border">
                    <button
                      className="px-2 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                      onClick={() => handleDelete(product._id)}
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

export default ProductDashboard;
