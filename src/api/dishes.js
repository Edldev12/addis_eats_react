const API_URL = "/menu-data.json";
const STORAGE_KEY = "addisEats_dishes";

export async function getDishes() {
  const savedDishes = localStorage.getItem(STORAGE_KEY);

  // Use admin-managed dishes if they exist
  if (savedDishes) {
    return JSON.parse(savedDishes);
  }

  // First run: load seed data
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load dishes");
  }

  const data = await response.json();

  const dishes = Array.isArray(data)
    ? data
    : data.dishes || [];

  const formattedDishes = dishes.map((dish) => ({
    ...dish,
    enabled: dish.enabled !== false,
  }));

  // Save initial dishes for admin/customer sharing
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(formattedDishes)
  );

  return formattedDishes;
}