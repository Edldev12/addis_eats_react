import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            🍽️ Addis Eats
          </Link>

          <p>
            Fresh food, delivered to your door in Addis Ababa.
          </p>
          <div className="social-icons"> <a href="#" aria-label="Facebook">📘</a> <a href="#" aria-label="Instagram">📸</a> <a href="#" aria-label="Twitter">🐦</a> <a href="#" aria-label="YouTube">▶️</a> </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/orders">My Orders</Link>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <h3>Contact</h3>

          <p>📍 Addis Ababa, Ethiopia</p>
          <p>📞 +251 900 000 000</p>
          <p>✉️ info@addiseats.com</p>
          <p>🕐 Open 8am – 10pm daily</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Addis Eats. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
