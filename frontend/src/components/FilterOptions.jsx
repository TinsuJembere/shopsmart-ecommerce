// src/components/FilterOptions.jsx
import React, { useState } from "react";

const categories = ["Electronics", "Furniture", "Fashion", "Books", "Home", "Toys"];

const FilterOptions = ({ onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCheckboxChange = (category) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updated);
    onFilterChange(updated);
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 bg-gray-100">
      filter by category:
      {categories.map((cat) => (
        <label key={cat} className="flex items-center space-x-2">
          <input
            type="checkbox"
            value={cat}
            checked={selectedCategories.includes(cat)}
            onChange={() => handleCheckboxChange(cat)}
          />
          <span>{cat}</span>
        </label>
      ))}
    </div>
  );
};

export default FilterOptions;
