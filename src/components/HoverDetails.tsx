import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface HoverDetailsProps {
  x?: number;
  y?: number;
  title: string;
  surname?: string;
  email: string;
  imageSrc?: string;
  position?: 'right' | 'left' | 'top' | 'bottom';
  className?: string;
  modelPosition: [number, number, number];
  cardOffset?: { x: number; y: number };
  roomID?: string; // NEW
  isHighlighted?: boolean; // NEW
  autoOpen?: boolean; // Optionally auto-open, e.g. when deep-linked
}

const HoverDetails: React.FC<HoverDetailsProps> = ({
  x,
  y,
  title,
  surname,
  email,
  imageSrc,
  position = 'right',
  className,
  modelPosition,
  cardOffset = { x: 0, y: 0 },
  roomID,
  isHighlighted = false,
  autoOpen = false,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(!!autoOpen);

  // Auto-open for deep links on mount
  useEffect(() => {
    if (autoOpen) setIsHovered(true);
  }, [autoOpen]);

  const getCardStyle = () => {
    switch (position) {
      case 'right':
        return { left: `calc(100% + ${cardOffset.x}px)`, top: '50%', transform: 'translateY(-50%)' };
      case 'left':
        return { right: `calc(100% + ${cardOffset.x}px)`, top: '50%', transform: 'translateY(-50%)' };
      case 'top':
        return { bottom: `calc(100% + ${cardOffset.y}px)`, left: '50%', transform: 'translateX(-50%)' };
      case 'bottom':
        return { top: `calc(100% + ${cardOffset.y}px)`, left: '50%', transform: 'translateX(-50%)' };
      default:
        return { left: `calc(100% + ${cardOffset.x}px)`, top: '50%', transform: 'translateY(-50%)' };
    }
  };

  return (
    <div 
      className={cn(
        "hotspot absolute w-6 h-6 rounded-full flex items-center justify-center cursor-pointer shadow-lg pointer-events-auto outline-none",
        isHighlighted 
          ? "bg-red-400 animate-pulse ring-4 ring-red-400 z-30" // <-- changed to red
          : "bg-primary/80 z-20"
      )}
      tabIndex={0}
      style={{ transform: 'translate(-50%, -50%)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-position={Array.isArray(modelPosition) ? modelPosition.join(',') : ''}
      data-room-id={roomID}
    >
      <div className={cn("w-2 h-2 bg-white rounded-full", isHighlighted && "bg-red-500")} />
      {/* Info card */}
      {isHovered && (
        <div 
          className={cn(
            "absolute bg-white p-3 rounded-lg shadow-lg opacity-0 animate-fade-in pointer-events-auto",
            className
          )}
          style={{ 
            ...getCardStyle(),
            animationFillMode: 'forwards',
            minWidth: '170px',
            maxWidth: '250px',
            zIndex: 1000,
          }}
        >
          <div className="mb-2">
            {imageSrc && (
              <img 
                src={imageSrc} 
                alt={title} 
                className="w-full h-auto object-cover mb-2 rounded"
              />
            )}
            <h4 className="text-base font-medium mb-0">{title}</h4>
            {surname && <p className="text-sm font-normal text-gray-600 mt-0">{surname}</p>}
            {roomID && <p className="text-xs text-gray-500 mt-0">Room: {roomID}</p>}
            {email && <p className="text-xs text-gray-500 mt-0">{email}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default HoverDetails;
