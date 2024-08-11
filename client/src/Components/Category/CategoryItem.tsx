import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Category } from '../../../../shared/Types/Category';
import { BsThreeDots } from 'react-icons/bs';
import { CgRename } from 'react-icons/cg';
import { RiDeleteBinLine } from 'react-icons/ri';
import useOutsideClick from '../../Hooks/useOutsideClick';
import {
  deleteCategory as deleteCategoryQuery,
  updateCategory as updateCategoryQuery,
} from '../../api/categories';
import { useNavigate } from 'react-router-dom';

type props = {
  category: Category;
  setCurrentCategory: Dispatch<SetStateAction<Category | null>>;
  setCategoryList: Dispatch<SetStateAction<Category[]>>;
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};

const CategoryItem = ({
  category,
  setCurrentCategory,
  setCategoryList,
  isMenuOpen,
  setIsMenuOpen,
}: props) => {
  const [showThreeDots, setShowThreeDots] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);

  const navigate = useNavigate();

  const deleteCategory = async () => {
    await deleteCategoryQuery(category.id);
    setCategoryList((prevCategoryList) =>
      prevCategoryList.filter((x) => x.id !== category.id)
    );
    setShowContextMenu(false);
    setIsMenuOpen(false);
  };

  const updateCategory = async () => {
    if (titleRef.current) {
      if (category.title != titleRef.current?.textContent) {
        await updateCategoryQuery(category.id, titleRef.current!.textContent!);
      }
      titleRef.current.contentEditable = 'false';
      setIsMenuOpen(false);
    }
  };

  const renameCategory = () => {
    if (titleRef.current) {
      setShowContextMenu(false);
      titleRef.current.contentEditable = 'true';
      titleRef.current.focus();
      const textNode = titleRef.current.firstChild;

      if (textNode instanceof Text) {
        const range = document.createRange();

        range.setStart(textNode, textNode.length);

        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  };

  const contextMenuItems = [
    { name: 'Rename', icon: CgRename, func: renameCategory },
    { name: 'Delete', icon: RiDeleteBinLine, func: deleteCategory },
  ];
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);

  useOutsideClick([contextMenuRef], () => {
    if (contextMenuRef.current) {
      setShowContextMenu(false);
      setIsMenuOpen(false);
    }
  });

  return (
    <>
      <div
        className="relative text-neutral-300 leading-7"
        onMouseEnter={() => setShowThreeDots(true)}
        onMouseLeave={() => setShowThreeDots(false)}
      >
        <div
          className={`flex items-center justify-between hover:bg-neutral-900 pl-2 pr-1 py-0.5 rounded-md cursor-pointer ${
            isMenuOpen ? 'pointer-events-none' : ''
          }`}
        >
          <span
            ref={titleRef}
            className="grow focus:outline-none"
            onClick={() => {
              navigate(`#${category.id}`);
              setCurrentCategory(category);
            }}
            onBlur={updateCategory}
          >
            {category.title}
          </span>
          {showThreeDots && !isMenuOpen && (
            <BsThreeDots
              className="hover:bg-neutral-800 size-6 p-1 rounded-md"
              onClick={() => {
                setShowContextMenu(true);
                setIsMenuOpen(true);
              }}
            />
          )}
        </div>
        {showContextMenu && (
          <div
            className="absolute z-10 right-0 top-0 border-neutral-800 border rounded-md w-fit overflow-hidden"
            ref={contextMenuRef}
          >
            <ul>
              {contextMenuItems.map((item, index) => (
                <>
                  {index > 0 && <hr className="border-neutral-800" />}
                  <li
                    className="z-10 p-2 hover:bg-neutral-800 bg-neutral-900 cursor-pointer flex items-center gap-3 pr-8"
                    onClick={item.func}
                  >
                    <item.icon />
                    <span>{item.name}</span>
                  </li>
                </>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryItem;
