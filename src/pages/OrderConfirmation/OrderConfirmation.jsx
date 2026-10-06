import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import "./OrderConfirmation.css";

function OrderConfirmation() {
  const orders = JSON.parse(
    localStorage.getItem("addisEats_orders") || "[]"
  );

  const order = orders[orders.length - 1];

  /* ========================================
     NO ORDER
  ======================================== */

  if (!order) {
    return (
      <section className="confirmation-page">
        <div className="confirmation-card">
          <h1>No Order Found</h1>

          <p>
            We couldn't find your recent order.
          </p>

          <Link
            to="/menu"
            className="confirmation-btn"
          >
            Browse Menu
          </Link>
        </div>
      </section>
    );
  }

  /* ========================================
     CONFIRMATION
  ======================================== */

  return (
    <section className="confirmation-page">
      <div className="confirmation-card">

        {/* SUCCESS ICON */}

        <div className="confirmation-icon">
          ✓
        </div>

        {/* LABEL */}

        <span className="confirmation-label">
          ORDER CONFIRMED
        </span>

        {/* TITLE */}

        <h1>
          Thank You for Your Order!
        </h1>

        <p className="confirmation-message">
          Your order has been placed successfully.
          We're preparing your delicious food.
        </p>

        {/* ORDER DETAILS */}

        <div className="confirmation-details">

          {/* ORDER NUMBER */}

          <div className="confirmation-row">
            <span>Order Number</span>

            <strong>
              #{order.id}
            </strong>
          </div>

          {/* STATUS */}

          <div className="confirmation-row">
            <span>Status</span>

            <strong
              className={`confirmation - status ${order.status
                .toLowerCase()
                .replace(/\s+/g, "-")
                } `}
            >
              {order.status}
            </strong>
          </div>

          {/* DELIVERY AREA */}

          <div className="confirmation-row">
            <span>Delivery Area</span>

            <strong>
              {order.customer?.area || "Not provided"}
            </strong>
          </div>

          {/* ADDRESS */}

          <div className="confirmation-row">
            <span>Delivery Address</span>

            <strong>
              {order.customer?.address || "Not provided"}
            </strong>
          </div>

          {/* ESTIMATED DELIVERY */}

          {order.estimatedDelivery && (
            <div className="confirmation-row">
              <span>Estimated Delivery</span>

              <strong>
                🚚 {order.estimatedDelivery}
              </strong>
            </div>
          )}

          {/* TOTAL */}

          <div className="confirmation-row total">
            <span>Total</span>

            <strong>
              {formatCurrency(order.total)}
            </strong>
          </div>

        </div>

        {/* SPECIAL INSTRUCTIONS */}

        {order.customer?.instructions && (
          <div className="confirmation-instructions">
            <strong>
              📝 Special Instructions
            </strong>

            <p>
              {order.customer.instructions}
            </p>
          </div>
        )}

        {/* ACTIONS */}

        <div className="confirmation-actions">

          <Link
            to="/orders"
            className="confirmation-btn secondary"
          >
            View My Orders
          </Link>

          <Link
            to="/menu"
            className="confirmation-btn"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    </section>
  );
}

export default OrderConfirmation;
