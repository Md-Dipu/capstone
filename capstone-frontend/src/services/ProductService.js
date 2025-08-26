import { api } from "../libs/api";

// Get all products with optional filters, sorting, searching, and pagination
export const getProducts = async (params = {}) => {
  const { data } = await api.get("/products", { params });
  return data;
};

// Get a single product by ID
export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

// Create a new product (admin only)
export const createProduct = async (product, config = {}) => {
  const { data } = await api.post("/products", product, config);
  return data;
};

// Update a product by ID (admin only)
export const updateProduct = async (id, updates, config = {}) => {
  const { data } = await api.put(`/products/${id}`, updates, config);
  return data;
};

// Delete a product by ID (admin only)
export const deleteProduct = async (id, config = {}) => {
  const { data } = await api.delete(`/products/${id}`, config);
  return data;
};

// Get product categories
export const getCategories = async () => {
  const { data } = await api.get("/products/categories");
  return data;
};
