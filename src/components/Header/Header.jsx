
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import { useCartStore } from "../../Store/cartStore";
import { useFavoriteStore } from "../../Store/favoriteStore";
import { useThemeStore } from "../../Store/themeStore";

import "./Header.css";

function Header() {
  const navigate = useNavigate();

  // Get customer directly from sessionStorage
  const [customer, setCustomer] = useState(() => {
    const savedCustomer = sessionStorage.getItem(
      "addisEats_customer"
    );

    return savedCustomer
      ? JSON.parse(savedCustomer)
      : null;
  });

  // Mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cart = useCartStore(
    (state) => state.cart
  );

  const favorites = useFavoriteStore(
    (state) => state.favorites
  );

  const theme = useThemeStore(
    (state) => state.theme
  );

  const toggleTheme = useThemeStore(
    (state) => state.toggleTheme
  );

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const favoriteCount = favorites.length;

  // Sign out
  const handleSignOut = () => {
    sessionStorage.removeItem(
      "addisEats_customer"
    );

    setCustomer(null);
    setIsMenuOpen(false);

    navigate("/signin");
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">

      <div className="header-container">

        {/* Logo */}
        <Link
          to="/"
          className="logo"
          onClick={closeMobileMenu}
        >
          🍽️ Addis Eats
        </Link>

        {/* Navigation */}
        <nav className="nav">
          <NavLink to="/">
            Home
          </NavLink>

          <NavLink to="/menu">
            Menu
          </NavLink>

          <NavLink to="/favorites">
            ❤️ Favorites
          </NavLink>

          <NavLink to="/orders">
            📦 Orders
          </NavLink>
        </nav>

        {/* Cart */}
        <Link to="/cart" className="cart-link">
          <span className="cart-icon">🛒</span>
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
          <span className="cart-text">Cart ({cartCount})</span>
        </Link>

        {/* Admin */}
        <Link
          to="/admin/login"
          className="admin-link"
        >
          Admin
        </Link>

        {/* Customer Authentication */}
        {customer ? (
          <div className="customer-auth">

            <span className="customer-name">
              {customer.name}
            </span>

            <button
              type="button"
              className="sign-out-btn"
              onClick={handleSignOut}
            >
              Sign Out
            </button>

          </div>
        ) : (
          <Link
            to="/signin"
            className="sign-in-link"
          >
            Sign In
          </Link>
        )}

        {/* Theme */}
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle dark and light theme"
        >
          {theme === "light"
            ? "🌙"
            : "☀️"}
        </button>

        {/* =================================================
            MOBILE HAMBURGER
        ================================================= */}

        <button
          type="button"
          className="hamburger"
          onClick={() =>
            setIsMenuOpen(!isMenuOpen)
          }
          aria-label="Open navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>

      {/* ===================================================
          MOBILE MENU
      =================================================== */}
      {isMenuOpen && (
        <>
          <div
            className="sidebar-overlay"
            onClick={closeMobileMenu}
          ></div>

          <aside className="mobile-sidebar">
            <div className="sidebar-header">
              <span>🍽️ Addis Eats</span>

              <button
                type="button"
                onClick={closeMobileMenu}
                className="sidebar-close"
              >
                ✕
              </button>
            </div>

            <nav className="sidebar-nav">
              <NavLink to="/" onClick={closeMobileMenu}>
                🏠 Home
              </NavLink>

              <NavLink to="/menu" onClick={closeMobileMenu}>
                🍽️ Menu
              </NavLink>

              <NavLink to="/favorites" onClick={closeMobileMenu}>
                ❤️ Favorites ({favoriteCount})
              </NavLink>

              <NavLink to="/orders" onClick={closeMobileMenu}>
                📦 Orders
              </NavLink>
              <NavLink to="/" onClick={closeMobileMenu}>
                Admin
              </NavLink>
              {customer ? (
                <button
                  type="button"
                  className="sidebar-sign-out"
                  onClick={handleSignOut}
                >
                  🚪 Sign Out
                </button>
              ) : (
                <NavLink to="/signin" onClick={closeMobileMenu}>
                  👤 Sign In
                </NavLink>
              )}
            </nav>
          </aside>
        </>
      )}

    </header>
  );
}

export default Header;
