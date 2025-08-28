import { api } from "../libs/api";

const ORDER_ENDPOINT = "/order";

export const getOrders = () => api.get(ORDER_ENDPOINT);
export const getOrderById = (id) => api.get(`${ORDER_ENDPOINT}/${id}`);
export const updateOrder = (id, updateData) =>
  api.patch(`${ORDER_ENDPOINT}/${id}`, updateData);
export const deleteOrder = (id) => api.delete(`${ORDER_ENDPOINT}/${id}`);
