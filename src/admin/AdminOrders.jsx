import { useMemo, useState } from "react";
import { formatCurrency } from "../utils/formatCurrency";
import "./AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] = useState(() => {
    const savedOrders =
      localStorage.getItem("addisEats_orders");

    return savedOrders
      ? JSON.parse(savedOrders)
      : [];
  });

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const categories = [
    "All",
    "Pending",
    "Preparing",
    "Delivering",
    "Delivered",
  ];

  const filteredOrders = useMemo(() => {
    if (selectedCategory === "All") {
      return orders;
    }

    return orders.filter((order) => {
      let status = order.status || "Pending";

      // Support customer-side status names
      if (status === "Confirmed") {
        status = "Preparing";
      }

      if (status === "Out for Delivery") {
        status = "Delivering";
      }

      return status === selectedCategory;
    });
  }, [orders, selectedCategory]);

  function updateOrderStatus(id, status) {
    const updatedOrders = orders.map((order) =>
      order.id === id
        ? {
          ...order,
          status,
        }
        : order
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "addisEats_orders",
      JSON.stringify(updatedOrders)
    );

    if (selectedOrder?.id === id) {
      setSelectedOrder({
        ...selectedOrder,
        status,
      });
    }
  }

  function deleteOrder(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmed) {
      return;
    }

    const updatedOrders = orders.filter(
      (order) => order.id !== id
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "addisEats_orders",
      JSON.stringify(updatedOrders)
    );

    setSelectedOrder(null);
  }

  return (
    <section className="admin-dashboard">
      <div className="admin-container">

        <div className="admin-header">
          <div>
            <h1>Manage Orders</h1>

            <p>
              View and manage customer orders.
            </p>
          </div>
        </div>

        {/* Order Categories */}

        <div className="admin-order-categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                selectedCategory === category
                  ? "admin-category-btn active"
                  : "admin-category-btn"
              }
              onClick={() =>
                setSelectedCategory(category)
              }
            >
              {category}

              <span>
                {category === "All"
                  ? orders.length
                  : orders.filter((order) => {
                    let status =
                      order.status || "Pending";

                    if (
                      status === "Confirmed"
                    ) {
                      status = "Preparing";
                    }

                    if (
                      status ===
                      "Out for Delivery"
                    ) {
                      status = "Delivering";
                    }

                    return status === category;
                  }).length}
              </span>
            </button>
          ))}
        </div>

        {/* Orders */}

        {orders.length === 0 ? (
          <div className="admin-panel">
            <p className="admin-empty">
              No orders found.
            </p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="admin-panel">
            <p className="admin-empty">
              No {selectedCategory.toLowerCase()} orders found.
            </p>
          </div>
        ) : (
          <div className="admin-orders-table-wrapper">

            <table className="admin-orders-table">

              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>

                    <td>
                      #{order.id}
                    </td>

                    <td>
                      {order.customer?.name ||
                        "Guest"}
                    </td>

                    <td>
                      {formatCurrency(order.total)}
                    </td>

                    <td>
                      <select
                        className="admin-status-select"
                        value={
                          order.status || "Pending"
                        }
                        onChange={(event) =>
                          updateOrderStatus(
                            order.id,
                            event.target.value
                          )
                        }
                      >
                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Preparing">
                          Preparing
                        </option>

                        <option value="Delivering">
                          Delivering
                        </option>

                        <option value="Delivered">
                          Delivered
                        </option>
                      </select>
                    </td>

                    <td>
                      {order.createdAt
                        ? new Date(
                          order.createdAt
                        ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>
                      <div className="admin-action-buttons">

                        <button
                          type="button"
                          className="admin-view-btn"
                          onClick={() =>
                            setSelectedOrder(order)
                          }
                        >
                          View
                        </button>

                        <button
                          type="button"
                          className="admin-delete-btn"
                          onClick={() =>
                            deleteOrder(order.id)
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

        {/* Order Details */}

        {selectedOrder && (
          <div className="admin-order-details">

            <div className="admin-order-details-header">
              <div>
                <h2>
                  Order #{selectedOrder.id}
                </h2>

                <p>
                  Customer order details
                </p>
              </div>

              <button
                type="button"
                className="admin-close-btn"
                onClick={() =>
                  setSelectedOrder(null)
                }
              >
                ×
              </button>
            </div>

            <div className="admin-order-info">

              <div>
                <strong>Customer</strong>

                <p>
                  {selectedOrder.customer?.name ||
                    "Guest"}
                </p>
              </div>

              <div>
                <strong>Phone</strong>

                <p>
                  {selectedOrder.customer?.phone ||
                    "-"}
                </p>
              </div>

              <div>
                <strong>Address</strong>

                <p>
                  {selectedOrder.customer?.address ||
                    "-"}
                </p>
              </div>

              <div>
                <strong>Area</strong>

                <p>
                  {selectedOrder.customer?.area ||
                    "-"}
                </p>
              </div>

            </div>

            <h3>Order Items</h3>

            <div className="admin-order-items">

              {selectedOrder.items?.map(
                (item) => (
                  <div
                    className="admin-order-item"
                    key={item.id}
                  >
                    <div>
                      <strong>
                        {item.name}
                      </strong>

                      <span>
                        Quantity:{" "}
                        {item.quantity}
                      </span>
                    </div>

                    <strong>
                      {formatCurrency(
                        Number(item.price) *
                        Number(item.quantity)
                      )}
                    </strong>
                  </div>
                )
              )}

            </div>

            <div className="admin-order-total">

              <span>Total</span>

              <strong>
                {formatCurrency(
                  selectedOrder.total
                )}
              </strong>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}

export default AdminOrders;