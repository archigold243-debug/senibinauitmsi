import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface HoverDetailsProps {
  x?: number;
  y?: number;
  title: string;
  surname?: string;
  description: string;
  imageSrc?: string; // New prop for image
  position?: 'right' | 'left' | 'top' | 'bottom';
  className?: string;
  modelPosition: [number, number, number]; // 3D coordinates in the model space (required)
  cardOffset?: { x: number; y: number }; // Custom offset for the info card
}

const HoverDetails: React.FC<HoverDetailsProps> = ({
  x,
  y,
  title,
  surname, // Add surname to destructuring
  description,
  imageSrc, // Accept imageSrc as a prop
  position = 'right',
  className,
  modelPosition,
  cardOffset = { x: 0, y: 0 },
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCardStyle = () => {
    switch (position) {
      case 'right':
        return { left: `calc(100% + ${cardOffset.x}px)`, top: `${cardOffset.y}px` };
      case 'left':
        return { right: `calc(100% + ${cardOffset.x}px)`, top: `${cardOffset.y}px` };
      case 'top':
        return { bottom: `calc(100% + ${cardOffset.y}px)`, left: `${cardOffset.x}px` };
      case 'bottom':
        return { top: `calc(100% + ${cardOffset.y}px)`, left: `${cardOffset.x}px` };
      default:
        return { left: `calc(100% + ${cardOffset.x}px)`, top: `${cardOffset.y}px` };
    }
  };

  return (
    <div 
      className={cn(
        "hotspot absolute w-6 h-6 rounded-full bg-primary/80 flex items-center justify-center cursor-pointer shadow-lg pointer-events-auto",
        isHovered ? "z-10" : "z-20" // Lower z-index when hovered so card appears on top
      )}
      style={{ transform: 'translate(-50%, -50%)' }} // Center the hotspot on its position
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-position={modelPosition.join(',')}
    >
      <div className="w-2 h-2 bg-white rounded-full"></div>
      
      {/* Render the info card conditionally based on hover state */}
      {isHovered && (
        <div 
          className={cn(
            "absolute bg-white p-3 rounded-lg shadow-lg opacity-0 animate-fade-in pointer-events-auto",
            className
          )}
          style={{ 
            ...getCardStyle(),
            animationFillMode: 'forwards',
            minWidth: '120px',
            maxWidth: '200px',
            zIndex: 100,
          }}
        >
          {/* Display the image, title, surname, and description in one column */}
          <div className="mb-2">
            {imageSrc && (
              <img 
                src={imageSrc} 
                alt={title} 
                className="w-full h-auto object-cover mb-2 rounded" // Full width, stacked image
              />
            )}
            <h4 className="text-base font-medium mb-1">{title}</h4> {/* Main title */}
            {surname && <p className="text-sm font-normal text-gray-600">{surname}</p>} {/* Surname, smaller font */}
          </div>
          
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      )}
    </div>
  );
};

export default HoverDetails;
