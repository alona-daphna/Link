import React from 'react';

interface LinkTooltipProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const LinkTooltip = ({ onMouseLeave, onMouseEnter }: LinkTooltipProps) => {
  return (
    <div onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}>
      LinkTooltip
    </div>
  );
};

export default LinkTooltip;
