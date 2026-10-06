import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getDishes } from "../../api/dishes";

import CategoryBar from "../../menu/CategoryBar/CategoryBar";
import DishList from "../../menu/DishList/DishList";

import "./Menu.css";

function Menu() {
  const [dishes, setDishes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "All";

  useEffect(() => {
    async function loadDishes() {
      try {
        setLoading(true);
        setError("");

        const data = await getDishes();
        setDishes(data);
      } catch {
        setError("Unable to load the menu. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadDishes();
  }, []);

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      const matchesCategory =
        category === "All" || dish.category === category;

      const matchesSearch = dish.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return (
        matchesCategory &&
        matchesSearch &&
        dish.enabled !== false
      );
    });
  }, [dishes, category, search]);

  function handleCategoryChange(newCategory) {
    const params = new URLSearchParams(searchParams);

    if (newCategory === "All") {
      params.delete("category");
    } else {
      params.set("category", newCategory);
    }

    setSearchParams(params);
  }

  function handleSearchChange(event) {
    const value = event.target.value;

    const params = new URLSearchParams(searchParams);

    if (value.trim() === "") {
      params.delete("search");
    } else {
      params.set("search", value);
    }

    setSearchParams(params);
  }

  return (
    <section className="menu-page">
      <div className="menu-container">

        <div className="menu-header">
          <span className="menu-label">OUR MENU</span>

          <h1>Delicious Food, Made for You</h1>

          <p>
            Explore our fresh and delicious meals from Addis Eats.
          </p>
        </div>

        {/* Search */}
        <div className="menu-search">
          <input
            type="search"
            placeholder="Search for a dish..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        {/* Categories */}
        <CategoryBar
          selectedCategory={category}
          onCategoryChange={handleCategoryChange}
        />

        {/* Loading */}
        {loading && (
          <div className="menu-status">
            <div className="spinner"></div>
            <p>Loading menu...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="menu-status error">
            <h3>Something went wrong</h3>
            <p>{error}</p>
          </div>
        )}

        {/* Dishes */}
        {!loading && !error && (
          <DishList dishes={filteredDishes} />
        )}

      </div>
    </section>
  );
}

export default Menu;