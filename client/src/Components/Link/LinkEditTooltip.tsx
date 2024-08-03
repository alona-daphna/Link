import React, { useRef } from 'react';
import useOutsideClick from '../../Hooks/useOutsideClick';
import { deleteLink as deleteLinkQuery } from '../../api/links';

interface LinkTooltipProps {
  hide: () => void;
  linkId: number;
  title: string;
  url: string;
  setTitle: (value: string) => void;
  setUrl: (value: string) => void;
}

const LinkTooltip = ({
  hide,
  linkId,
  title,
  url,
  setTitle,
  setUrl,
}: LinkTooltipProps) => {
  const ref = useRef(null);

  useOutsideClick([ref], hide);

  const deleteLink = async () => {
    await deleteLinkQuery(linkId);
    hide();
  };

  return (
    <div
      className="bg-neutral-900 rounded-md divide-y divide-neutral-800 absolute index-10"
      ref={ref}
    >
      <div className="flex flex-col">
        <label className="pl-2 pt-1 text-sm text-neutral-500">URL</label>
        <input
          className="my-2 w-11/12 self-center focus:outline-none bg-neutral-800 rounded-md py-1 px-2"
          type="text"
          onChange={(e) => setUrl(e.target.value)}
          value={url}
        />
        <label className="pl-2 pt-1 text-sm text-neutral-500">Link title</label>
        <input
          className="my-2 w-11/12 self-center focus:outline-none bg-neutral-800 rounded-md py-1 px-2"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div
        className="flex justify-center py-2 text-sm text-red-500 cursor-pointer"
        onClick={deleteLink}
      >
        delete
      </div>
    </div>
  );
};

export default LinkTooltip;
