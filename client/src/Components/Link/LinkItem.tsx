import React, { useState } from 'react';
import { Link } from '../../Types/Link';
import LinkEditMenu from './LinkEditMenu';
import LinkTooltip from './LinkTooltip';

const LinkItem = ({ link }: { link: Link }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      <div
        className="w-full overflow-auto cursor-pointer px-2 py-0.5"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <a
          className="underline text-neutral-500"
          href={link.url}
          target="_blank"
        >
          {link.title || link.url}
        </a>
      </div>
      {showTooltip && <LinkTooltip />}
      {showMenu && <LinkEditMenu />}
    </>
  );
};

export default LinkItem;
