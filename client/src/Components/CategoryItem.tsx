import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Category } from '../Types/Category';
import { BsThreeDots } from 'react-icons/bs';
import { CgRename } from 'react-icons/cg';
import { RiDeleteBinLine } from 'react-icons/ri';
import useOutsideClick from '../Hooks/useOutsideClick';

type props = {
  category: Category;
  setCurrentCategory: Dispatch<SetStateAction<Category | null>>;
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};

const CategoryItem = ({
  category,
  setCurrentCategory,
  isMenuOpen,
  setIsMenuOpen,
}: props) => {
  const [showThreeDots, setShowThreeDots] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const contextMenuItems = [
    { name: 'Rename', icon: CgRename },
    { name: 'Delete', icon: RiDeleteBinLine },
  ];
  const contextMenuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(contextMenuRef, () => {
    setShowContextMenu(false);
    setIsMenuOpen(false);
  });

  return (
    <>
      <div
        className="relative text-neutral-300 leading-7"
        onMouseEnter={() => setShowThreeDots(true)}
        onMouseLeave={() => setShowThreeDots(false)}
      >
        <div
          className={`flex items-center justify-between  hover:text-teal-500 hover:bg-neutral-900 pl-2 pr-1 py-0.5 rounded-md cursor-pointer ${
            isMenuOpen ? 'pointer-events-none' : ''
          }`}
        >
          <span className="grow" onClick={() => setCurrentCategory(category)}>
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
            className="absolute right-0 top-0 border-neutral-800 border rounded-md w-fit"
            ref={contextMenuRef}
          >
            <ul>
              {contextMenuItems.map((item, index) => (
                <>
                  {index > 0 && <hr className="border-neutral-800" />}
                  <li className="z-10 p-2 hover:bg-neutral-900 cursor-pointer flex items-center gap-3 pr-8">
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
