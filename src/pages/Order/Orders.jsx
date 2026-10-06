import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../../Store/cartStore";
import "./Orders.css";

function Orders() {
  const navigate = useNavigate();

  const addItem = useCartStore((state) => state.addItem);

  const orders = JSON.parse(
    localStorage.getItem("addisEats_orders") || "[]"
  )
    .slice()
    .reverse();


  function handleReorder(order) {
    if (!order.items || order.items.length === 0) {
      return;
    }

    order.items.forEach((item) => {
      addItem({
        ...item,
        quantity: item.quantity,
      });
    });

    navigate("/cart");
  }

  /* ========================================
     EMPTY ORDERS
  ======================================== */

  if (orders.length === 0) {
    return (
      <section className="orders-page">
        <div className="orders-empty">
          <div className="orders-empty-icon">📦</div>

          <h2>No Orders Yet</h2>

          <p>You haven't placed any orders yet.</p>

          <Link to="/menu" className="orders-menu-btn">
            Browse Menu
          </Link>
        </div>
      </section>
    );
  }

  /* ========================================
     ORDER HISTORY
  ======================================== */

  return (
    <section className="orders-page">
      <div className="orders-container">

        {/* HEADER */}

        <div className="orders-header">
          <span>ORDER HISTORY</span>

          <h1>My Orders</h1>

          <p>
            View your previous orders and reorder
            your favorite meals.
          </p>
        </div>

        {/* ORDERS LIST */}

        <div className="orders-list">
          {orders.map((order) => (
            <article
              className="order-card"
              key={order.id}
            >

              {/* ORDER HEADER */}

              <div className="order-top">
                <div>
                  <span className="order-number">
                    Order #{order.id}
                  </span>

                  <p className="order-date">
                    {new Date(
                      order.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                {/* FIXED CLASS NAME */}

                <span
                  className={`order-status ${(order.status || "Pending")
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {order.status || "Pending"}
                </span>
              </div>

              {/* ORDER ITEMS */}

              <div className="order-items">
                {order.items.map((item) => (
                  <div
                    className="order-item"
                    key={item.id}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div className="order-item-info">
                      <h3>{item.name}</h3>

                      <p>
                        {item.quantity} ×{" "}
                        {item.price.toLocaleString()} ETB
                      </p>
                    </div>

                    <strong>
                      {(
                        item.price * item.quantity
                      ).toLocaleString()} ETB
                    </strong>
                  </div>
                ))}
              </div>

              {/* DELIVERY INFORMATION + TOTAL */}

              <div className="order-bottom">

                <div className="order-delivery">
                  <span>Delivery Information</span>

                  {order.customer?.address && (
                    <p>
                      📍 {order.customer.address}
                    </p>
                  )}

                  {order.customer?.area && (
                    <p>
                      Area: {order.customer.area}
                    </p>
                  )}

                  {order.customer?.instructions && (
                    <p>
                      📝 Instructions:{" "}
                      {order.customer.instructions}
                    </p>
                  )}

                  {order.estimatedDelivery && (
                    <p>
                      🚚 Estimated delivery:{" "}
                      {order.estimatedDelivery}
                    </p>
                  )}
                </div>

                {/* TOTAL */}

                <div className="order-total">
                  <span>Total</span>

                  <strong>
                    {(order.total || 0).toLocaleString()} ETB
                  </strong>
                </div>
              </div>

              {/* REORDER */}

              <button
                type="button"
                className="reorder-btn"
                onClick={() => handleReorder(order)}
              >
                🔄 Reorder
              </button>

            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Orders;