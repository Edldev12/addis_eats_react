import { Link } from "react-router-dom";
import CategoryCards from "../../components/CatagoryCard/CategoryCards";
import "./Home.css";

function Home() {
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">🍽️ Welcome to Addis Eats</span>

          <h1>
            Delicious Food,
            <br />
            Delivered to You
          </h1>

          <p>
            Discover delicious meals from your favorite restaurants
            in Addis Ababa.
          </p>

          <Link to="/menu" className="hero-button">
            Explore Menu
          </Link>
        </div>
      </section>
      <CategoryCards />
      {/* Today's Specials */}
      <section className="specials">
        <div className="section-header">
          <span>🔥 Today's Specials</span>

          <h2>Popular Dishes</h2>

          <p>
            Enjoy some of today's most popular dishes.
          </p>
        </div>

        <div className="specials-grid">

          <article className="special-card">
            <div className="special-image">
              <img src="/images/Doro-wet.png" />
            </div>

            <div className="special-info">
              <h3>Doro Wot</h3>
              <p>Traditional Ethiopian spicy chicken stew.</p>
              <strong>250 ETB</strong>
            </div>
          </article>

          <article className="special-card">
            <div className="special-image">
              <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" />
            </div>

            <div className="special-info">
              <h3>Cheese Pizza</h3>
              <p>Fresh pizza topped with delicious cheese.</p>
              <strong>300 ETB</strong>
            </div>
          </article>

          <article className="special-card">
            <div className="special-image">
              <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd" />
            </div>

            <div className="special-info">
              <h3>Classic Burger</h3>
              <p>Juicy burger served with fresh ingredients.</p>
              <strong>280 ETB</strong>
            </div>
          </article>

        </div>

        <div className="view-menu">
          <Link to="/menu">
            View Full Menu →
          </Link>
        </div>
      </section>

    </div>
  );
}

export default Home;