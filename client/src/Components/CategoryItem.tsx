import React from "react";
import { Category } from "../Types/Category";

type props = {
  category: Category;
  setCurrentCategory: React.Dispatch<React.SetStateAction<Category | null>>;
};

const CategoryItem = ({ category, setCurrentCategory }: props) => {
  return (
    <div className="underline" onClick={() => setCurrentCategory(category)}>
      {category.title}
    </div>
  );
};

export default CategoryItem;
