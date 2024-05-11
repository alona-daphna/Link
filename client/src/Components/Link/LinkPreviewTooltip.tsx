import React, { useRef, useState } from 'react';
import useOutsideClick from '../../Hooks/useOutsideClick';
import { FaRegCopy } from 'react-icons/fa6';

interface LinkHoverTooltipProps {
  hide: () => void;
  url: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  showEdit: () => void;
}

const LinkHoverTooltip = ({
  hide,
  url,
  onMouseEnter,
  onMouseLeave,
  showEdit,
}: LinkHoverTooltipProps) => {
  const ref = useRef(null);

  useOutsideClick([ref], hide);

  const copyToClipboard = () => {};

  return (
    <div
      className="absolute index-10 grid grid-flow-col gap-1 p-2 bg-neutral-900 rounded-md"
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      ref={ref}
    >
      <p className="w-[100px] overflow-auto text-nowrap mr-1">{url}</p>
      <div className="cursor-pointer flex items-center aspect-square justify-center hover:bg-neutral-800 rounded-md">
        <FaRegCopy onClick={copyToClipboard} />
      </div>
      <button
        onClick={showEdit}
        className="hover:bg-neutral-800 py-1 px-2 text-sm rounded-md"
      >
        Edit
      </button>
    </div>
  );
};

export default LinkHoverTooltip;
