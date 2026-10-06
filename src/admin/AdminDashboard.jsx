import { useMemo } from "react";
import { formatCurrency } from "../utils/formatCurrency";
import "./AdminDashbord.css";

function AdminDashboard() {

  const orders = useMemo(() => {
    const savedOrders = localStorage.getItem("addisEats_orders");

    return savedOrders
      ? JSON.parse(savedOrders)
      : [];
  }, []);
  const dishes = JSON.parse(
    localStorage.getItem("addisEats_dishes") || "[]"
  );

  const menuItemCount = dishes.length;
  const analytics = useMemo(() => {
    const revenue = orders.reduce(
      (total, order) =>
        total + Number(order.total || 0),
      0
    );

    const orderCount = orders.length;

    const averageOrderValue =
      orderCount > 0
        ? revenue / orderCount
        : 0;

    const statusCounts = {
      Pending: 0,
      Preparing: 0,
      Delivering: 0,
      Delivered: 0,
    };

    orders.forEach((order) => {
      let status = order.status || "Pending";

      // Normalize customer-side status names
      if (status === "Confirmed") {
        status = "Preparing";
      }

      if (status === "Out for Delivery") {
        status = "Delivering";
      }

      if (statusCounts[status] !== undefined) {
        statusCounts[status]++;
      }
    });

    const dishSales = {};

    orders.forEach((order) => {
      order.items?.forEach((item) => {
        if (!dishSales[item.name]) {
          dishSales[item.name] = 0;
        }

        dishSales[item.name] += Number(
          item.quantity || 0
        );
      });
    });

    const topDishes = Object.entries(dishSales)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      revenue,
      orderCount,
      averageOrderValue,
      statusCounts,
      topDishes,
    };
  }, [orders]);


  return (
    <section className="admin-dashboard">
      <div className="admin-container">

        <div className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>
              Manage Addis Eats and monitor restaurant
              performance.
            </p>
          </div>

        </div>

        {/* Analytics */}

        <div className="admin-stats">

          <div className="admin-stat-card">
            <span className="admin-stat-icon">
              💰
            </span>

            <div>
              <p>Revenue</p>
              <h2>
                {formatCurrency(
                  analytics.revenue
                )}
              </h2>
            </div>
          </div>

          <div className="admin-stat-card">
            <span className="admin-stat-icon">
              📦
            </span>

            <div>
              <p>Total Orders</p>
              <h2>
                {analytics.orderCount}
              </h2>
            </div>
          </div>

          <div className="admin-stat-card">
            <span className="admin-stat-icon">
              📊
            </span>

            <div>
              <p>Average Order</p>
              <h2>
                {formatCurrency(
                  analytics.averageOrderValue
                )}
              </h2>
            </div>

          </div>
          <div className="admin-stat-card">
            <span className="admin-stat-icon">
              🍽
            </span>
            <h3>{menuItemCount}</h3>
            <p>Menu Items</p>
          </div>
        </div>

        {/* Main Dashboard */}

        <div className="admin-dashboard-grid">

          {/* Top Selling Dishes */}

          <div className="admin-panel">
            <div className="admin-panel-header">
              <h2>Top Selling Dishes</h2>
            </div>

            {analytics.topDishes.length === 0 ? (
              <p className="admin-empty">
                No sales data yet.
              </p>
            ) : (
              <div className="top-dishes-list">
                {analytics.topDishes.map(
                  ([name, quantity], index) => (
                    <div
                      className="top-dish-item"
                      key={name}
                    >
                      <span className="top-dish-number">
                        {index + 1}
                      </span>

                      <span className="top-dish-name">
                        {name}
                      </span>

                      <strong>
                        {quantity} sold
                      </strong>
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {/* Order Status */}

          <div className="admin-panel">
            <div className="admin-panel-header">
              <h2>Order Status</h2>
            </div>

            <div className="status-list">

              <div className="status-row">
                <span>Pending</span>
                <strong>
                  {analytics.statusCounts.Pending}
                </strong>
              </div>

              <div className="status-row">
                <span>Preparing</span>
                <strong>
                  {analytics.statusCounts.Preparing}
                </strong>
              </div>

              <div className="status-row">
                <span>Delivering</span>
                <strong>
                  {analytics.statusCounts.Delivering}
                </strong>
              </div>

              <div className="status-row">
                <span>Delivered</span>
                <strong>
                  {analytics.statusCounts.Delivered}
                </strong>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default AdminDashboard;