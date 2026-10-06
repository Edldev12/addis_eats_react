
import { create } from "zustand";

const savedCart = JSON.parse(
  localStorage.getItem("addisEats_cart") || "[]"
);

export const useCartStore = create((set) => ({
  cart: savedCart,

  /* ========================================
     ADD ITEM
  ======================================== */

  addItem: (dish) =>
    set((state) => {
      const quantityToAdd = dish.quantity || 1;

      const existingItem = state.cart.find(
        (item) => item.id === dish.id
      );

      const newCart = existingItem
        ? state.cart.map((item) =>
          item.id === dish.id
            ? {
              ...item,
              quantity:
                item.quantity + quantityToAdd,
            }
            : item
        )
        : [
          ...state.cart,
          {
            ...dish,
            quantity: quantityToAdd,
          },
        ];

      localStorage.setItem(
        "addisEats_cart",
        JSON.stringify(newCart)
      );

      return {
        cart: newCart,
      };
    }),

  /* ========================================
     REMOVE ITEM
  ======================================== */

  removeItem: (id) =>
    set((state) => {
      const newCart = state.cart.filter(
        (item) => item.id !== id
      );

      localStorage.setItem(
        "addisEats_cart",
        JSON.stringify(newCart)
      );

      return {
        cart: newCart,
      };
    }),

  /* ========================================
     INCREASE QUANTITY
  ======================================== */

  increaseQuantity: (id) =>
    set((state) => {
      const newCart = state.cart.map((item) =>
        item.id === id
          ? {
            ...item,
            quantity: item.quantity + 1,
          }
          : item
      );

      localStorage.setItem(
        "addisEats_cart",
        JSON.stringify(newCart)
      );

      return {
        cart: newCart,
      };
    }),

  /* ========================================
     DECREASE QUANTITY
  ======================================== */

  decreaseQuantity: (id) =>
    set((state) => {
      const newCart = state.cart
        .map((item) =>
          item.id === id
            ? {
              ...item,
              quantity: item.quantity - 1,
            }
            : item
        )
        .filter((item) => item.quantity > 0);

      localStorage.setItem(
        "addisEats_cart",
        JSON.stringify(newCart)
      );

      return {
        cart: newCart,
      };
    }),

  /* ========================================
     CLEAR CART
  ======================================== */

  clearCart: () => {
    localStorage.removeItem("addisEats_cart");

    set({
      cart: [],
    });
  },
}));