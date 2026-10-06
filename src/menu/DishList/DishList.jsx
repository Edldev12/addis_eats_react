
import DishCard from "../DishCart/DishCard";
import "./DishList.css";

function DishList({ dishes }) {
  if (dishes.length === 0) {
    return (
      <div className="empty-menu">
        <div className="empty-menu-icon">🍽️</div>

        <h3>No dishes found</h3>

        <p>
          We couldn't find any dishes matching your search.
        </p>
      </div>
    );
  }

  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <DishCard
          key={dish.id}
          dish={dish}
        />
      ))}
    </div>
  );
}

export default DishList;
