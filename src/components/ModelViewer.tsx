
import React, { useEffect, useRef, useState } from 'react';

interface ModelViewerProps {
  modelSrc: string;
  children?: React.ReactNode;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelSrc, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    // This is a placeholder for the actual model loading
    // In a real implementation, you would load your SketchUp model here
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [modelSrc]);

  return (
    <div className="relative w-full h-full min-h-[500px] md:min-h-[700px]" ref={containerRef}>
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full loading-skeleton"></div>
            <p className="mt-4 text-sm text-gray-500">Loading model...</p>
          </div>
        </div>
      ) : (
        <>
          {/* This div would be replaced with your actual SketchUp model viewer */}
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-center px-4">
              <p className="text-lg text-gray-500 mb-2">SketchUp Model Placeholder</p>
              <p className="text-sm text-gray-400">{modelSrc}</p>
              <p className="mt-4 text-xs text-gray-400">
                Note: In the actual implementation, this placeholder would be replaced with your SketchUp model viewer.
                You would need to integrate your specific SketchUp viewer library or API here.
              </p>
            </div>
          </div>
          
          {/* This is where interactive elements would be placed */}
          <div className="model-container">
            {children}
          </div>
        </>
      )}
    </div>
  );
};

export default ModelViewer;
