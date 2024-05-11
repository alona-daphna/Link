import React, { useRef, useState } from 'react';
import useOutsideClick from '../../Hooks/useOutsideClick';
import { FaRegCopy } from 'react-icons/fa6';
import Snackbar from '../Snackbar';

interface LinkHoverTooltipProps {
  hide: () => void;
  url: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  showEdit: () => void;
  setShowSnackbar: (value: boolean) => void;
  showSnackbar: boolean;
}

const LinkHoverTooltip = ({
  hide,
  url,
  onMouseEnter,
  onMouseLeave,
  showEdit,
  setShowSnackbar,
  showSnackbar,
}: LinkHoverTooltipProps) => {
  const ref = useRef(null);

  useOutsideClick([ref], hide);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setShowSnackbar(true);
    setTimeout(() => {
      console.log('copy');

      setShowSnackbar(false);
    }, 3000);
  };

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
      {showSnackbar && <Snackbar title="Copied link to clipboard" />}
    </div>
  );
};

export default LinkHoverTooltip;
