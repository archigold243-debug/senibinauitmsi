
import React from 'react';

interface LoadingStateProps {
  isLoading: boolean;
  error: string | null;
}

const LoadingState: React.FC<LoadingStateProps> = ({ isLoading, error }) => {
  if (!isLoading && !error) return null;
  
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-50 pointer-events-none">
      {isLoading && (
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="mt-4 text-sm text-gray-500">Loading model...</p>
        </div>
      )}
      
      {error && (
        <div className="text-center px-4">
          <p className="text-lg text-red-500 mb-2">{error}</p>
          <p className="text-sm text-gray-500">
            Please check that the model file exists and is in the correct format.
          </p>
        </div>
      )}
    </div>
  );
};

export default LoadingState;
