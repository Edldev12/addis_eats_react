
import { Link } from "react-router-dom";
import "./CategoryCards.css";

function CategoryCards() {
  const categories = [
    {
      name: "Ethiopian",
      category: "Ethiopian",
      icon: "🇪🇹",
      description: "Traditional Ethiopian favorites",
    },
    {
      name: "Pizza",
      category: "Pizza",
      icon: "🍕",
      description: "Fresh and delicious pizza",
    },
    {
      name: "Burgers",
      category: "Burgers",
      icon: "🍔",
      description: "Juicy and tasty burgers",
    },
    {
      name: "Drinks",
      category: "Drinks",
      icon: "🥤",
      description: "Refreshing drinks for everyone",
    },
  ];

  return (
    <section className="Categories-Card">
      <div className="Categories-Card-container">
        <div className="Categories-Card-header">
          <h2>Food Categories</h2>
          <p>Explore our delicious food categories</p>
        </div>

        <div className="Categories-Card-grid">
          {categories.map((item) => (
            <Link
              key={item.name}
              to={`/menu?category=${encodeURIComponent(item.category)}`}
              className="food-category-card"
            >
              <div className="food-category-icon">
                {item.icon}
              </div>

              <div className="food-category-content">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>

              <span className="food-category-arrow">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryCards;
