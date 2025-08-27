import { api } from "../libs/api";

export const createCheckoutSession = async (cartItems) => {
  const { data } = await api.post("payment/create-checkout-session", {
    cartItems,
  });
  return data;
};
