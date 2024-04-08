import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Breadcrumbs from "../Components/Breadcrumbs";
import { Category } from "../Types/Category";
import CategoryItem from "../Components/CategoryItem";
import EnterToCreateInput from "../Components/EnterToCreateInput";

const Home = () => {
  const [rootCategories, setRootCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        `http://localhost:3000/categories/in/${
          currentCategory ? currentCategory.id : 0
        }`
      );
      setRootCategories(await response.json());
    };

    const fetchBreadcrumbs = async () => {
      if (currentCategory) {
        const response = await fetch(
          `http://localhost:3000/categories/${currentCategory.id}`
        );
        setBreadcrumbs(await response.json());
      } else {
        setBreadcrumbs([]);
      }
    };

    fetchCategories();
    fetchBreadcrumbs();
  }, [currentCategory]);

  return (
    <>
      <Navbar />
      <div className="w-80 mx-auto mt-12 mb-36">
        <Breadcrumbs
          breadcrumbs={breadcrumbs}
          setCurrentCategory={setCurrentCategory}
        />
        <div className="mt-10">
          {rootCategories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              setCurrentCategory={setCurrentCategory}
            />
          ))}
        </div>
        <EnterToCreateInput setCategoryList={setRootCategories} currentCategory={currentCategory}/>
      </div>
    </>
  );
};

export default Home;
