
import React from 'react';
import { Button } from '@/components/ui/button';

interface LoadingStateProps {
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
  modelSrc?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ isLoading, error, onRetry, modelSrc }) => {
  if (!isLoading && !error) return null;
  
  // Format error message for display - preserve newlines
  const formattedError = error ? (
    <div className="whitespace-pre-line text-left">
      {error}
    </div>
  ) : null;
  
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
      {isLoading && (
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="mt-4 text-sm text-gray-500">Loading model...</p>
          {modelSrc && <p className="text-xs text-gray-400">File: {modelSrc}</p>}
        </div>
      )}
      
      {error && (
        <div className="text-center px-4 max-w-md">
          <p className="text-lg text-red-500 mb-2">Error Loading Model</p>
          {formattedError}
          <div className="space-y-2 mt-4">
            {onRetry && (
              <Button onClick={onRetry} variant="default">
                Retry Loading
              </Button>
            )}
            <div className="text-xs text-gray-500 mt-4">
              <p>If the problem persists:</p>
              <ul className="list-disc pl-5 mt-2 text-left">
                <li>Check your network connection</li>
                <li>Try clearing your browser cache</li>
                <li>Contact support if the issue continues</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingState;
