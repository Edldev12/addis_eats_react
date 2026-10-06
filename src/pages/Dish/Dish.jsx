import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDishes } from "../../api/dishes";
import { useCartStore } from "../../Store/cartStore";
import { useFavoriteStore } from "../../Store/favoriteStore";
import { formatCurrency } from "../../utils/formatCurrency";
import "./Dish.css";

function Dish() {
  const { id } = useParams();

  const addItem = useCartStore(
    (state) => state.addItem
  );

  const toggleFavorite = useFavoriteStore(
    (state) => state.toggleFavorite
  );

  const favorites = useFavoriteStore(
    (state) => state.favorites
  );

  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isFavorite = dish
    ? favorites.some(
      (item) => item.id === dish.id
    )
    : false;

  useEffect(() => {
    async function loadDish() {
      try {
        setLoading(true);
        setError("");

        const dishes = await getDishes();

        const selectedDish = dishes.find(
          (dish) => dish.id === Number(id)
        );

        if (!selectedDish) {
          setError("Dish not found.");
          return;
        }

        setDish(selectedDish);
      } catch {
        setError("Unable to load dish details.");
      } finally {
        setLoading(false);
      }
    }

    loadDish();
  }, [id]);

  if (loading) {
    return (
      <section className="dish-page">
        <p>Loading dish...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="dish-page">
        <h2>{error}</h2>

        <Link
          to="/menu"
          className="back-menu-btn"
        >
          ← Back to Menu
        </Link>
      </section>
    );
  }

  function handleAddToCart() {
    addItem(dish);
  }

  return (
    <section className="dish-page">
      <div className="dish-details">

        {/* Dish Image */}
        <div className="dish-details-image">
          <img
            src={dish.image}
            alt={dish.name}
          />
        </div>

        {/* Dish Information */}
        <div className="dish-details-content">

          <span className="dish-category">
            {dish.category}
          </span>

          <h1>{dish.name}</h1>

          <p className="dish-rating">
            ⭐ {dish.rating} ({dish.reviews} reviews)
          </p>

          <p className="dish-description">
            {dish.description}
          </p>

          {/* Ingredients */}
          <div className="dish-ingredients">
            <h2>Ingredients</h2>

            {dish.ingredients?.length > 0 ? (
              <ul>
                {dish.ingredients.map(
                  (ingredient) => (
                    <li key={ingredient}>
                      {ingredient}
                    </li>
                  )
                )}
              </ul>
            ) : (
              <p>
                Ingredients information is not
                available.
              </p>
            )}
          </div>

          {/* Price */}
          <h2 className="dish-detail-price">
            {formatCurrency(dish.price)}
          </h2>

          {/* Actions */}
          <div className="dish-detail-actions">

            <button
              type="button"
              className="add-cart-btn"
              onClick={handleAddToCart}
            >
              🛒 Add to Cart
            </button>

            <button
              type="button"
              className={`favorite-detail-btn ${isFavorite ? "active" : ""
                } `}
              onClick={() =>
                toggleFavorite(dish)
              }
            >
              {isFavorite
                ? "❤️ Favorited"
                : "♡ Add to Favorites"}
            </button>

            <Link
              to="/cart"
              className="view-cart-btn"
            >
              View Cart
            </Link>

          </div>

          {/* Back to Menu */}
          <Link
            to="/menu"
            className="back-menu-btn"
          >
            ← Back to Menu
          </Link>

        </div>
      </div>
    </section>
  );
}

export default Dish;
