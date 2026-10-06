import { Link } from "react-router-dom";
import { useCartStore } from "../../Store/cartStore";
import "./Cart.css";

function Cart() {
  const cart = useCartStore((state) => state.cart);
  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );
  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );
  const removeItem = useCartStore(
    (state) => state.removeItem
  );
  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <section className="cart-page">
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>

          <h1>Your Cart is Empty</h1>

          <p>
            You haven't added any dishes to your cart yet.
          </p>

          <Link to="/menu" className="continue-shopping-btn">
            Browse Menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-container">

        <div className="cart-header">
          <div>
            <span className="cart-label">YOUR ORDER</span>
            <h1>Your Cart</h1>
          </div>

          <button
            type="button"
            className="clear-cart-btn"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>

        <div className="cart-content">

          <div className="cart-items">
            {cart.map((item) => (
              <article
                className="cart-item"
                key={item.id}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />

                <div className="cart-item-info">
                  <span className="cart-item-category">
                    {item.category}
                  </span>

                  <h2>{item.name}</h2>

                  <p>
                    {item.price.toLocaleString()} ETB
                  </p>

                  <div className="quantity-controls">
                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-right">
                  <strong>
                    {(
                      item.price * item.quantity
                    ).toLocaleString()}{" "}
                    ETB
                  </strong>

                  <button
                    type="button"
                    className="remove-item-btn"
                    onClick={() =>
                      removeItem(item.id)
                    }
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Items</span>
              <span>
                {cart.reduce(
                  (sum, item) =>
                    sum + item.quantity,
                  0
                )}
              </span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>
                {total.toLocaleString()} ETB
              </span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total</span>
              <strong>
                {total.toLocaleString()} ETB
              </strong>
            </div>

            <Link
              to="/checkout"
              className="checkout-btn"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/menu"
              className="continue-shopping-link"
            >
              ← Continue Shopping
            </Link>
          </aside>

        </div>
      </div>
    </section>
  );
}

export default Cart;