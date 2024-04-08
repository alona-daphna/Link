import React from "react";
import { Category } from "../Types/Category";

type props = {
  category: Category;
  setCurrentCategory: React.Dispatch<React.SetStateAction<Category | null>>;
};

const CategoryItem = ({ category, setCurrentCategory }: props) => {
  return (
    <div className="underline font-light leading-7 cursor-pointer hover:text-teal-500" onClick={() => setCurrentCategory(category)}>
      {category.title}
    </div>
  );
};

export default CategoryItem;
