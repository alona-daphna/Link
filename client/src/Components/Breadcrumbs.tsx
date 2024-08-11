import React from 'react';
import { Category } from '../../../shared/Types/Category';
import { useNavigate } from 'react-router-dom';

type props = {
  breadcrumbs: Category[];
  setCurrentCategory: React.Dispatch<React.SetStateAction<Category | null>>;
};

const Breadcrumbs = ({ breadcrumbs, setCurrentCategory }: props) => {
  const navigate = useNavigate();

  return (
    <div className="text-lg font-mono font-bold">
      <span
        className="cursor-pointer hover:text-teal-500"
        onClick={() => {
          navigate('');
          setCurrentCategory(null);
        }}
      >
        /{' '}
      </span>
      {breadcrumbs.map((category, index) => (
        <span
          className="cursor-pointer hover:text-teal-500"
          key={category.id}
          onClick={() => {
            navigate(`#${category.id}`);
            setCurrentCategory(category);
          }}
        >
          {index == 0 ? category.title : ` / ${category.title}`}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
