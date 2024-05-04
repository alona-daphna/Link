import { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Breadcrumbs from '../Components/Breadcrumbs';
import { Category } from '../Types/Category';
import CategoryItem from '../Components/Category/CategoryItem';
import EnterToCreateInput from '../Components/EnterToCreateInput';
import { Link } from '../Types/Link';
import LinkItem from '../Components/Link/LinkItem';

const Home = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [linkList, setLinkList] = useState<Link[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<Category[]>([]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        `http://localhost:3000/categories/in/${
          currentCategory ? currentCategory.id : 0
        }`
      );
      setCategoryList(await response.json());
    };

    const fetchLinks = async () => {
      const response = await fetch(
        `http://localhost:3000/links/category/${currentCategory?.id}`
      );
      setLinkList(await response.json());
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
    fetchLinks();
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
          {categoryList.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              setCurrentCategory={setCurrentCategory}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
          ))}
        </div>
        <div>
          {linkList.map((link) => (
            <LinkItem key={link.id} link={link} />
          ))}
        </div>
        <EnterToCreateInput
          setLinkList={setLinkList}
          setCurrentCategory={setCurrentCategory}
          setCategoryList={setCategoryList}
          currentCategory={currentCategory}
        />
      </div>
    </>
  );
};

export default Home;
