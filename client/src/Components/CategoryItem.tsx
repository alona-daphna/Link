import React, { useRef, useState } from "react";
import { Category } from "../Types/Category";
import { BsThreeDots } from 'react-icons/bs'
import useOutsideClick from "../Hooks/useOutsideClick";

type props = {
  category: Category;
  setCurrentCategory: React.Dispatch<React.SetStateAction<Category | null>>;
};

const CategoryItem = ({ category, setCurrentCategory }: props) => {
  const [showThreeDots, setShowThreeDots] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false)
  const contextMenuRef = useRef<HTMLDivElement>(null)

  useOutsideClick(contextMenuRef, () => setShowContextMenu(false))

  return (
    <>
      <div className="font-normal flex items-center justify-between text-neutral-300 leading-7 cursor-pointer hover:text-teal-500 hover:bg-neutral-900 pl-2 pr-1 py-0.5 rounded-md" 
        onMouseEnter={() => setShowThreeDots(true)}
        onMouseLeave={() => setShowThreeDots(false)}>
        <span className="grow" onClick={() => setCurrentCategory(category)}>{category.title}</span>
        {showThreeDots && <BsThreeDots className="hover:bg-neutral-800 size-6 p-1 rounded-md"
          onClick={() => {setShowContextMenu(true)}}/>}
      </div>
      {showContextMenu && <div ref={contextMenuRef}>
        context menu
      </div>}
    </>
  );
};

export default CategoryItem;
