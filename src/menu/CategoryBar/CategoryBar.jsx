import "./CategoryBar.css";

function CategoryBar({
  selectedCategory,
  onCategoryChange,
}) {
  const categories = [
    "All",
    "Ethiopian",
    "Pizza",
    "Burgers",
    "Drinks",
  ];

  return (
    <div className="category-bar">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={
            selectedCategory === category
              ? "active"
              : ""
          }
          onClick={() =>
            onCategoryChange(category)
          }
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;