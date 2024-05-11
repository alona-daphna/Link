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
      className="absolute index-10 flex items-center gap-2 bg-neutral-900 py-1 px-2 rounded-md"
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      ref={ref}
    >
      <p className="w-[100px] overflow-auto text-nowrap">{url}</p>
      <FaRegCopy onClick={copyToClipboard} className="cursor-pointer text-lg" />
      <button onClick={showEdit}>Edit</button>
    </div>
  );
};

export default LinkHoverTooltip;
