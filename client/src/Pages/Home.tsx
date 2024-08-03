import { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Breadcrumbs from '../Components/Breadcrumbs';
import { Category } from '../../../shared/Types/Category';
import CategoryItem from '../Components/Category/CategoryItem';
import EnterToCreateInput from '../Components/EnterToCreateInput';
import { Link } from '../../../shared/Types/Link';
import LinkItem from '../Components/Link/LinkItem';
import { fetchLinks } from '../api/links';
import { fetchBreadcrumbs, fetchCategories } from '../api/categories';

const Home = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [linkList, setLinkList] = useState<Link[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<Category[]>([]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    console.log({ currentCategory });

    const getCategories = async () => {
      const categories = await fetchCategories(
        currentCategory ? currentCategory.id : 0
      );

      console.log('fetched categories', categories);

      setCategoryList(categories);
    };

    const getLinks = async () => {
      const links = await fetchLinks(currentCategory?.id || null);
      console.log('fetch links', links);

      setLinkList(links);
    };

    const getBreadcrumbs = async () => {
      if (currentCategory) {
        const breadcrumbs = await fetchBreadcrumbs(currentCategory.id);

        console.log('fetch breadcrumbs', breadcrumbs);

        setBreadcrumbs(breadcrumbs);
      } else {
        setBreadcrumbs([]);
      }
    };

    getCategories();
    getLinks();
    getBreadcrumbs();
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
              setCategoryList={setCategoryList}
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
