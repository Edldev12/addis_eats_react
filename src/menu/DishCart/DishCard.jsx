import { Link } from "react-router-dom";
import { useCartStore } from "../../Store/cartStore";
import { useFavoriteStore } from "../../Store/favoriteStore";
import { formatCurrency } from "../../utils/formatCurrency";
import "./DishCard.css";

function DishCard({ dish }) {
  const addItem = useCartStore(
    (state) => state.addItem
  );

  const toggleFavorite = useFavoriteStore(
    (state) => state.toggleFavorite
  );

  const favorites = useFavoriteStore(
    (state) => state.favorites
  );

  const isFavorite = favorites.some(
    (item) => item.id === dish.id
  );

  function handleFavorite(event) {
    event.stopPropagation();
    toggleFavorite(dish);
  }

  return (
    <article className="dish-card">

      <div className="dish-image-link">
        <img
          src={dish.image}
          alt={dish.name}
          className="dish-image"
        />

        <button
          type="button"
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={handleFavorite}
          aria-label={
            isFavorite
              ? `Remove ${dish.name} from favorites`
              : `Add ${dish.name} to favorites`
          }
          title={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          {isFavorite ? "❤️" : "♡"}
        </button>
      </div>

      <div className="dish-info">

        <span className="dish-category">
          {dish.category}
        </span>

        <h3 className="dish-name">
          {dish.name}
        </h3>

        <p className="dish-rating">
          ⭐ {dish.rating} ({dish.reviews} reviews)
        </p>

        <div className="dish-description-row">

          <p className="dish-description">
            {dish.description}
          </p>

          <Link
            to={`/menu/${dish.id}`}
            className="view-dish-link"
          >
            See More
          </Link>

        </div>

        <div className="dish-bottom">

          <strong className="dish-price">
            {formatCurrency(dish.price)}
          </strong>

          <button
            type="button"
            className="add-cart-btn"
            onClick={() => addItem(dish)}
            aria-label={`Add ${dish.name} to cart`}
          >
            Add to Cart
          </button>

        </div>

      </div>
    </article>
  );
}

export default DishCard;
