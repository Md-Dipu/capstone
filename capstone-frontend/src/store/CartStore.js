import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      cartItems: () => get().items,
      total: () =>
        get().items.reduce(
          (sum, item) => sum + item.price * (item.quantity || 1),
          0
        ),
      count: () =>
        get().items.reduce((sum, item) => sum + (item.quantity || 1), 0),

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((i) => i._id === item._id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i._id === item._id
                  ? { ...i, quantity: (i.quantity || 1) + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        });
      },

      removeItem: (id) => {
        set((state) => {
          const existing = state.items.find((i) => i._id === id);
          if (!existing) return { items: state.items };

          if (existing.quantity > 1) {
            return {
              items: state.items.map((i) =>
                i._id === id ? { ...i, quantity: i.quantity - 1 } : i
              ),
            };
          }
          return { items: state.items.filter((i) => i._id !== id) };
        });
      },

      clearCart: () => set({ items: [] }),
    }),
    { name: "cart_items" }
  )
);
