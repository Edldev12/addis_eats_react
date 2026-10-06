import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAdminAuth } from "./useAdminAuth";
import { useThemeStore } from "../Store/themeStore";
import "./AdminLayout.css";

function AdminLayout() {
  const navigate = useNavigate();
  const { logout } = useAdminAuth();
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }

  function toggleSidebar() {
    setIsSidebarOpen((prev) => !prev);
  }

  return (
    <div
      className={`admin-layout ${isSidebarOpen ? "sidebar-open" : "sidebar-collapsed"
        }`}
    >

      {/* =====================================================
          SIDEBAR
      ===================================================== */}
      <aside className="admin-sidebar">

        <div className="admin-profile">

          <div className="admin-profile-avatar">
            A
          </div>

          <div>
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>

        </div>

        {/* Toggle */}
        <button
          type="button"
          className="admin-sidebar-toggle"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? "«" : "»"}
        </button>

        {/* Navigation */}
        <nav className="admin-sidebar-nav">

          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive
                ? "admin-sidebar-link active"
                : "admin-sidebar-link"
            }
          >
            <span>📊</span>
            <label>Dashboard</label>
          </NavLink>

          <NavLink
            to="/admin/dishes"
            className={({ isActive }) =>
              isActive
                ? "admin-sidebar-link active"
                : "admin-sidebar-link"
            }
          >
            <span>🍽️</span>
            <label>Menu</label>
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              isActive
                ? "admin-sidebar-link active"
                : "admin-sidebar-link"
            }
          >
            <span>📦</span>
            <label>Orders</label>
          </NavLink>

        </nav>

        {/* Logout */}
        <button
          type="button"
          className="admin-sidebar-logout"
          onClick={handleLogout}
        >
          <span>🚪</span>
          <label>Logout</label>
        </button>

      </aside>


      {/* =====================================================
          MAIN
      ===================================================== */}
      <div className="admin-main">

        {/* Header */}
        <header className="admin-top-header">
          <button
            type="button"
            className="admin-theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <button
            type="button"
            className="admin-customer-menu-btn"
            onClick={() => navigate("/menu")}
          >
            ← Back to Customer Menu
          </button>

        </header>

        {/* Content */}
        <main className="admin-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;