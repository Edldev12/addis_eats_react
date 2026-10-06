import { create } from "zustand";

const savedFavorites = JSON.parse(
  localStorage.getItem("addisEats_favorites") || "[]"
);

export const useFavoriteStore = create((set) => ({
  favorites: savedFavorites,

  toggleFavorite: (dish) =>
    set((state) => {
      const exists = state.favorites.some(
        (item) => item.id === dish.id
      );

      const newFavorites = exists
        ? state.favorites.filter(
          (item) => item.id !== dish.id
        )
        : [...state.favorites, dish];

      localStorage.setItem(
        "addisEats_favorites",
        JSON.stringify(newFavorites)
      );

      return {
        favorites: newFavorites,
      };
    }),

  removeFavorite: (dishId) =>
    set((state) => {
      const newFavorites = state.favorites.filter(
        (item) => item.id !== dishId
      );

      localStorage.setItem(
        "addisEats_favorites",
        JSON.stringify(newFavorites)
      );

      return {
        favorites: newFavorites,
      };
    }),

  clearFavorites: () => {
    localStorage.removeItem("addisEats_favorites");

    set({
      favorites: [],
    });
  },
}));