import { useEffect, useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import CategoryItem from "./Category/CategoryItem";
import EnterToCreateInput from "./EnterToCreateInput";
import LinkItem from "./Link/LinkItem";
import { fetchLinks } from "../api/links";
import { useLocation } from "react-router-dom";
import { Link } from "../../../shared/Types/Link";
import { Category } from "../../../shared/Types/Category";
import { fetchBreadcrumbs, fetchCategories, fetchCategoryById } from "../api/categories";

const Explorer = () => {
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [linkList, setLinkList] = useState<Link[]>([]);
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
    const [breadcrumbs, setBreadcrumbs] = useState<Category[]>([]);
  
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const location = useLocation();
  
    const getCategories = async () => {
      const categories = await fetchCategories(
        currentCategory ? currentCategory.id : 0
      );
  
      setCategoryList(categories);
    };
  
    const getLinks = async () => {
      const links = await fetchLinks(currentCategory?.id || null);
      setLinkList(links);
    };
  
    const getBreadcrumbs = async () => {
      if (currentCategory) {
        const breadcrumbs = await fetchBreadcrumbs(currentCategory.id);
        setBreadcrumbs(breadcrumbs);
      } else {
        setBreadcrumbs([]);
      }
    };
  
    const getCategory = async (id: number) => {
      const category = await fetchCategoryById(id);
  
      if (category) {
        setCurrentCategory(category);
      }
    };
  
    const extractCategoryFromHash = () => {
      const hash = location.hash.substring(1);
      const categoryId = hash === '' ? NaN : Number(hash);
  
      if (!isNaN(categoryId)) {
        getCategory(categoryId);
      } else {
        setCurrentCategory(null);
      }
    };
  
    useEffect(() => {
      getCategories();
      getLinks();
      getBreadcrumbs();
    }, [currentCategory]);
  
    useEffect(() => {
      extractCategoryFromHash();
    }, [location]);
  
    useEffect(() => {
      extractCategoryFromHash();
    }, []);

    return (
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
            <LinkItem key={link.id} link={link} setLinkList={setLinkList} />
          ))}
        </div>
        <EnterToCreateInput
          setLinkList={setLinkList}
          setCurrentCategory={setCurrentCategory}
          setCategoryList={setCategoryList}
          currentCategory={currentCategory}
        />
      </div>
    )
}


export default Explorer;