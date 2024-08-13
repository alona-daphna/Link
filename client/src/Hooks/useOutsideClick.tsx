import { RefObject, useEffect } from 'react';

const useOutsideClick = <T extends HTMLElement>(
  refs: RefObject<T>[],
  handler: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      let clickedOutside = true;
      for (const ref of refs) {
        if (ref.current && ref.current.contains(event.target as Node)) {
          clickedOutside = false;
          break;
        }
      }

      if (clickedOutside) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs]);
};

export default useOutsideClick;
