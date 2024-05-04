import { RefObject } from 'react';

interface BlockOptionProps {
  inputRef: RefObject<HTMLInputElement>;
  createBlock: () => void;
  placeholder: string;
  escape: () => void;
}

const BlockOption = ({
  inputRef,
  createBlock,
  placeholder,
  escape,
}: BlockOptionProps) => {
  return (
    <input
      className="px-2 placeholder-neutral-600 focus:outline-0 bg-inherit w-full"
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      onKeyDown={(e) => {
        if (e.key === 'Enter') createBlock();
        if (e.key === 'Escape') escape();
      }}
      onBlur={escape}
    />
  );
};

export default BlockOption;
