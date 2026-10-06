import { create } from "zustand";

const savedTheme =
  localStorage.getItem("addisEats_theme") || "light";

// Apply saved theme when the app starts
if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
} else {
  document.body.classList.remove("dark-theme");
}

export const useThemeStore = create((set) => ({
  theme: savedTheme,

  toggleTheme: () =>
    set((state) => {
      const newTheme =
        state.theme === "light"
          ? "dark"
          : "light";

      localStorage.setItem(
        "addisEats_theme",
        newTheme
      );

      // Apply theme to the whole application
      document.body.classList.toggle(
        "dark-theme",
        newTheme === "dark"
      );

      return {
        theme: newTheme,
      };
    }),
}));