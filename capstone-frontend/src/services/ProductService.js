import { api } from "../libs/api";

export async function getProducts() {
  const { data } = await api.get("products");
  return data;
}

// This function retrieves a product by its ID and has been created for you, but you will need to import it in your components as needed.
export async function getProductById(id) {
  const { data } = await api.get(`products/${id}`);
  return data;
}
