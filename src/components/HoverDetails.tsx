
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface HoverDetailsProps {
  x: number;
  y: number;
  z?: number;
  title: string;
  description: string;
  position?: 'right' | 'left' | 'top' | 'bottom';
  className?: string;
  modelPosition?: [number, number, number]; // 3D coordinates in the model space
  cardOffset?: { x: number; y: number }; // Custom offset for the info card
}

const HoverDetails: React.FC<HoverDetailsProps> = ({
  x,
  y,
  z = 0,
  title,
  description,
  position = 'right',
  className,
  modelPosition,
  cardOffset = { x: 0, y: 0 },
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCardStyle = () => {
    const baseOffset = 20; // Base offset from the hotspot in pixels
    
    switch (position) {
      case 'right':
        return { left: `${baseOffset + cardOffset.x}px`, top: `${cardOffset.y}px` };
      case 'left':
        return { right: `${baseOffset + cardOffset.x}px`, top: `${cardOffset.y}px` };
      case 'top':
        return { bottom: `${baseOffset + cardOffset.y}px`, left: `${cardOffset.x}px` };
      case 'bottom':
        return { top: `${baseOffset + cardOffset.y}px`, left: `${cardOffset.x}px` };
      default:
        return { left: `${baseOffset + cardOffset.x}px`, top: `${cardOffset.y}px` };
    }
  };

  // Create a data-position attribute with the 3D coordinates if provided
  const positionAttribute = modelPosition 
    ? { 'data-position': modelPosition.join(',') }
    : {};

  return (
    <>
      <div 
        className="hotspot absolute w-6 h-6 rounded-full bg-primary/80 flex items-center justify-center -ml-3 -mt-3 cursor-pointer shadow-lg pointer-events-auto z-10"
        style={{ left: `${x}%`, top: `${y}%` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...positionAttribute}
      >
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
      {isHovered && (
        <div 
          className={cn(
            "info-card absolute bg-white p-3 rounded-lg shadow-lg z-20 opacity-0 animate-fade-in pointer-events-auto",
            className
          )}
          style={{ 
            ...getCardStyle(),
            left: position === 'right' || position === 'bottom' ? `${x}%` : 'auto',
            right: position === 'left' ? `${100 - x}%` : 'auto',
            top: position === 'right' || position === 'left' || position === 'bottom' ? `${y}%` : 'auto',
            bottom: position === 'top' ? `${100 - y}%` : 'auto',
            animationFillMode: 'forwards',
            minWidth: '220px',
            maxWidth: '300px',
            transform: 'translateX(0) translateY(0)', // Will be overridden by inline style if needed
          }}
        >
          <h4 className="text-base font-medium mb-1">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      )}
    </>
  );
};

export default HoverDetails;
