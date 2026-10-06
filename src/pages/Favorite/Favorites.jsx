import { Link } from "react-router-dom";
import { useFavoriteStore } from "../../Store/favoriteStore";
import { useCartStore } from "../../Store/cartStore";
import { formatCurrency } from "../../utils/formatCurrency";
import "./Favorite.css";

function Favorites() {
  const favorites = useFavoriteStore(
    (state) => state.favorites
  );

  const removeFavorite = useFavoriteStore(
    (state) => state.removeFavorite
  );

  const addItem = useCartStore(
    (state) => state.addItem
  );

  if (favorites.length === 0) {
    return (
      <section className="favorites-page">
        <div className="favorites-empty">
          <div className="favorites-empty-icon">
            ❤️
          </div>

          <h2>No Favorites Yet</h2>

          <p>
            You haven't added any dishes to your
            favorites yet.
          </p>

          <Link
            to="/menu"
            className="browse-menu-btn"
          >
            Browse Menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="favorites-page">
      <div className="favorites-container">

        <div className="favorites-header">
          <span className="favorites-label">
            YOUR FAVORITES
          </span>

          <h1>Favorite Dishes</h1>

          <p>
            Your favorite dishes are all in one place.
          </p>
        </div>

        <div className="favorites-grid">

          {favorites.map((dish) => (
            <article
              className="favorite-card"
              key={dish.id}
            >
              <img
                src={dish.image}
                alt={dish.name}
                className="favorite-image"
              />

              <div className="favorite-info">

                <span className="favorite-category">
                  {dish.category}
                </span>

                <h2 className="favorite-name">
                  {dish.name}
                </h2>

                {/* Description + See More */}
                <div className="favorite-description-row">
                  <p className="favorite-description">
                    {dish.description}
                  </p>

                  <Link
                    to={`/menu/${dish.id}`}
                    className="view-dish-link"
                  >
                    See More
                  </Link>
                </div>
                <div className="favorite-bottom">
                  <strong className="favorite-price">
                    {formatCurrency(dish.price)}
                  </strong>

                  <button
                    type="button"
                    className="favorite-cart-btn"
                    onClick={() => addItem(dish)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Remove */}
              < button
                type="button"
                className="remove-favorite-btn"
                onClick={() =>
                  removeFavorite(dish.id)
                }
              >
                Remove
              </button>

            </article>
          ))}

        </div>
      </div >
    </section >
  );
}

export default Favorites;