
import React from 'react';
import { cn } from '@/lib/utils';

interface HoverDetailsProps {
  x: number;
  y: number;
  title: string;
  description: string;
  position?: 'right' | 'left' | 'top' | 'bottom';
  className?: string;
}

const HoverDetails: React.FC<HoverDetailsProps> = ({
  x,
  y,
  title,
  description,
  position = 'right',
  className,
}) => {
  const getCardStyle = () => {
    switch (position) {
      case 'right':
        return { left: '30px', top: '0' };
      case 'left':
        return { right: '30px', top: '0' };
      case 'top':
        return { bottom: '30px', left: '0' };
      case 'bottom':
        return { top: '30px', left: '0' };
      default:
        return { left: '30px', top: '0' };
    }
  };

  return (
    <>
      <div 
        className="hotspot"
        style={{ left: `${x}%`, top: `${y}%` }}
      />
      <div 
        className={cn("info-card", className)}
        style={{ 
          ...getCardStyle(),
          left: position === 'right' || position === 'bottom' ? `${x}%` : 'auto',
          right: position === 'left' ? `${100 - x}%` : 'auto',
          top: position === 'right' || position === 'left' || position === 'bottom' ? `${y}%` : 'auto',
          bottom: position === 'top' ? `${100 - y}%` : 'auto',
          transform: 'scale(0.95)',
          minWidth: '240px',
          maxWidth: '320px',
        }}
      >
        <h4 className="text-base font-medium mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </>
  );
};

export default HoverDetails;
