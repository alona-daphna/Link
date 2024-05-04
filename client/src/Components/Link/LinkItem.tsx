import { useRef, useState } from 'react';
import { Link } from '../../Types/Link';
import LinkEditMenu from './LinkEditMenu';
import LinkTooltip from './LinkTooltip';

const LinkItem = ({ link }: { link: Link }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  let hideTooltipDelay: number;
  let showTooltipDelay: number;

  const handleMouseLeave = () => {
    clearTimeout(showTooltipDelay);
    hideTooltipDelay = setTimeout(() => setShowTooltip(false), 500);
  };

  return (
    <>
      <div
        className="w-full overflow-auto cursor-pointer px-2 py-0.5"
        onMouseEnter={() => {
          showTooltipDelay = setTimeout(() => {
            setShowTooltip(true);
          }, 500);
        }}
        onMouseLeave={handleMouseLeave}
      >
        <a
          className="underline text-neutral-500"
          href={link.url}
          target="_blank"
        >
          {link.title || link.url}
        </a>
      </div>
      {showTooltip && (
        <LinkTooltip
          onMouseEnter={() => clearTimeout(hideTooltipDelay)}
          onMouseLeave={handleMouseLeave}
        />
      )}
      {showMenu && <LinkEditMenu />}
    </>
  );
};

export default LinkItem;
