import { useEffect, useState } from "react";
import { formatCurrency } from "../utils/formatCurrency";
import "./Admin.css";

function AdminDishes() {
  const [dishes, setDishes] = useState(() => {
    const savedDishes =
      localStorage.getItem("addisEats_dishes");

    return savedDishes
      ? JSON.parse(savedDishes)
      : [];
  });

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingDishId, setEditingDishId] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    ingredients: "",
    image: "",
    rating: "5",
    reviews: "0",
    enabled: true,
  });

  /*
   * Seed dishes from public/menu-data.json
   * only when localStorage does not contain dishes.
   */
  useEffect(() => {
    const savedDishes =
      localStorage.getItem("addisEats_dishes");

    if (savedDishes) {
      return;
    }

    async function seedDishes() {
      try {
        const response =
          await fetch("/menu-data.json");

        if (!response.ok) {
          throw new Error(
            "Failed to load menu-data.json"
          );
        }

        const data = await response.json();

        const seededDishes =
          Array.isArray(data)
            ? data
            : data.dishes || [];

        const formattedDishes =
          seededDishes.map((dish) => ({
            ...dish,
            enabled: dish.enabled !== false,
          }));

        localStorage.setItem(
          "addisEats_dishes",
          JSON.stringify(formattedDishes)
        );

        setDishes(formattedDishes);
      } catch (error) {
        console.error(
          "Error seeding dishes:",
          error
        );
      }
    }

    seedDishes();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function resetForm() {
    setFormData({
      name: "",
      price: "",
      category: "",
      description: "",
      ingredients: "",
      image: "",
      rating: "5",
      reviews: "0",
      enabled: true,
    });

    setEditingDishId(null);
    setShowForm(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const dishData = {
      name: formData.name.trim(),
      price: Number(formData.price),
      category: formData.category,
      description: formData.description.trim(),
      ingredients: formData.ingredients
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      image: formData.image.trim(),
      rating: Number(formData.rating),
      reviews: Number(formData.reviews),
      enabled: formData.enabled,
    };

    let updatedDishes;

    if (editingDishId !== null) {
      updatedDishes = dishes.map((dish) =>
        dish.id === editingDishId
          ? {
            ...dish,
            ...dishData,
          }
          : dish
      );
    } else {
      const newDish = {
        id: Date.now(),
        ...dishData,
      };

      updatedDishes = [
        ...dishes,
        newDish,
      ];
    }

    setDishes(updatedDishes);

    localStorage.setItem(
      "addisEats_dishes",
      JSON.stringify(updatedDishes)
    );

    resetForm();
  }

  function handleEdit(dish) {
    setEditingDishId(dish.id);

    setFormData({
      name: dish.name || "",
      price: dish.price || "",
      category: dish.category || "",
      description: dish.description || "",
      ingredients: Array.isArray(
        dish.ingredients
      )
        ? dish.ingredients.join(", ")
        : dish.ingredients || "",
      image: dish.image || "",
      rating: dish.rating || "5",
      reviews: dish.reviews || "0",
      enabled: dish.enabled !== false,
    });

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this dish?"
    );

    if (!confirmed) {
      return;
    }

    const updatedDishes = dishes.filter(
      (dish) => dish.id !== id
    );

    setDishes(updatedDishes);

    localStorage.setItem(
      "addisEats_dishes",
      JSON.stringify(updatedDishes)
    );

    if (editingDishId === id) {
      resetForm();
    }
  }

  function handleToggleStatus(id) {
    const updatedDishes = dishes.map((dish) =>
      dish.id === id
        ? {
          ...dish,
          enabled: dish.enabled === false,
        }
        : dish
    );

    setDishes(updatedDishes);

    localStorage.setItem(
      "addisEats_dishes",
      JSON.stringify(updatedDishes)
    );
  }

  const filteredDishes = dishes.filter((dish) => {
    const searchText = search.toLowerCase();

    return (
      dish.name
        ?.toLowerCase()
        .includes(searchText) ||
      dish.category
        ?.toLowerCase()
        .includes(searchText)
    );
  });

  return (
    <section className="admin-dashboard">
      <div className="admin-container">

        {/* Header */}
        <div className="admin-header">
          <div>
            <h1>Manage Dishes</h1>

            <p>
              Add, edit, search, enable, disable,
              and delete dishes.
            </p>
          </div>

          <button
            type="button"
            className="admin-add-btn"
            onClick={() => {
              if (showForm) {
                resetForm();
              } else {
                setShowForm(true);
              }
            }}
          >
            {showForm
              ? "Cancel"
              : "+ Add Dish"}
          </button>
        </div>

        {/* Add / Edit Form */}
        {showForm && (
          <div className="admin-panel admin-form-panel">

            <h2>
              {editingDishId !== null
                ? "Edit Dish"
                : "Add New Dish"}
            </h2>

            <form
              className="admin-dish-form"
              onSubmit={handleSubmit}
            >

              <div className="admin-form-group">
                <label htmlFor="name">
                  Dish Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter dish name"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="price">
                  Price
                </label>

                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="category">
                  Category
                </label>

                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select category
                  </option>

                  <option value="Breakfast">
                    Breakfast
                  </option>

                  <option value="Lunch">
                    Lunch
                  </option>

                  <option value="Dinner">
                    Dinner
                  </option>

                  <option value="Fast Food">
                    Fast Food
                  </option>

                  <option value="Drinks">
                    Drinks
                  </option>

                  <option value="Traditional">
                    Traditional
                  </option>
                </select>
              </div>

              <div className="admin-form-group">
                <label htmlFor="image">
                  Image URL
                </label>

                <input
                  id="image"
                  name="image"
                  type="text"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                  required
                />
              </div>

              <div className="admin-form-group admin-form-full">
                <label htmlFor="description">
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter dish description"
                  rows="3"
                  required
                />
              </div>

              <div className="admin-form-group admin-form-full">
                <label htmlFor="ingredients">
                  Ingredients
                </label>

                <input
                  id="ingredients"
                  name="ingredients"
                  type="text"
                  value={formData.ingredients}
                  onChange={handleChange}
                  placeholder="Chicken, onion, tomato"
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="rating">
                  Rating
                </label>

                <input
                  id="rating"
                  name="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleChange}
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="reviews">
                  Reviews
                </label>

                <input
                  id="reviews"
                  name="reviews"
                  type="number"
                  min="0"
                  value={formData.reviews}
                  onChange={handleChange}
                />
              </div>

              <div className="admin-form-actions">

                <button
                  type="submit"
                  className="admin-save-btn"
                >
                  {editingDishId !== null
                    ? "Update Dish"
                    : "Add Dish"}
                </button>

                <button
                  type="button"
                  className="admin-cancel-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>

              </div>

            </form>
          </div>
        )}

        {/* Search */}
        <div className="admin-dishes-toolbar">

          <input
            type="text"
            placeholder="Search dishes..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>

        {/* Dishes */}
        {filteredDishes.length === 0 ? (
          <div className="admin-panel">
            <p className="admin-empty">
              No dishes found.
            </p>
          </div>
        ) : (
          <div className="admin-dishes-table-wrapper">

            <table className="admin-dishes-table">

              <thead>
                <tr>
                  <th>Dish</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredDishes.map((dish) => (
                  <tr key={dish.id}>

                    <td>
                      <div className="admin-dish-info">

                        <img
                          src={dish.image}
                          alt={dish.name}
                        />

                        <span>
                          {dish.name}
                        </span>

                      </div>
                    </td>

                    <td>
                      {dish.category}
                    </td>

                    <td>
                      {formatCurrency(dish.price)}
                    </td>

                    <td>
                      <span
                        className={
                          dish.enabled === false
                            ? "dish-status disabled"
                            : "dish-status enabled"
                        }
                      >
                        {dish.enabled === false
                          ? "Disabled"
                          : "Enabled"}
                      </span>
                    </td>

                    <td>
                      <div className="admin-action-buttons">

                        <button
                          type="button"
                          className="admin-edit-btn"
                          onClick={() =>
                            handleEdit(dish)
                          }
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className={
                            dish.enabled === false
                              ? "admin-enable-btn"
                              : "admin-disable-btn"
                          }
                          onClick={() =>
                            handleToggleStatus(
                              dish.id
                            )
                          }
                        >
                          {dish.enabled === false
                            ? "Enable"
                            : "Disable"}
                        </button>

                        <button
                          type="button"
                          className="admin-delete-btn"
                          onClick={() =>
                            handleDelete(dish.id)
                          }
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </div>
    </section>
  );
}

export default AdminDishes;