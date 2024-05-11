import { useState } from 'react';
import { Link } from '../../Types/Link';
import LinkTooltip from './LinkEditTooltip';
import LinkHoverTooltip from './LinkPreviewTooltip';

const LinkItem = ({ link }: { link: Link }) => {
  const [showPreviewTooltip, setShowPreviewTooltip] = useState(false);
  const [showEditTooltip, setShowEditTooltip] = useState(false);
  const [title, setTitle] = useState(link.title || link.url);
  const [url, setUrl] = useState(link.url);
  let hideTooltipDelay: number;
  let showTooltipDelay: number;

  const handleMouseLeave = () => {
    showTooltipDelay && clearTimeout(showTooltipDelay);
    hideTooltipDelay = setTimeout(() => setShowPreviewTooltip(false), 500);
    updateLink();
  };

  const updateLink = () => {
    if ((link.title || link.url) != title || link.url != url) {
      console.log('saving changes...');
    }
  };

  return (
    <>
      <div
        className="w-full overflow-auto cursor-pointer px-2 py-0.5"
        onMouseEnter={() => {
          showTooltipDelay = setTimeout(() => {
            setShowPreviewTooltip(true);
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
      {showPreviewTooltip && (
        <LinkHoverTooltip
          showEdit={() => {
            setShowPreviewTooltip(false);
            setShowEditTooltip(true);
          }}
          onMouseEnter={() => clearTimeout(hideTooltipDelay!)}
          onMouseLeave={handleMouseLeave}
          hide={() => {
            setShowPreviewTooltip(false);
          }}
          url={link.url}
        />
      )}
      {showEditTooltip && (
        <LinkTooltip
          hide={() => {
            setShowEditTooltip(false);
            updateLink();
          }}
          title={title}
          setTitle={setTitle}
          url={url}
          setUrl={setUrl}
        />
      )}
    </>
  );
};

export default LinkItem;
