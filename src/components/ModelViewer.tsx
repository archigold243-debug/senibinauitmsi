
import { useRef, useState } from "react";
import { useThreeJsScene } from "../hooks/useThreeJsScene";
import LoadingState from "./model-viewer/LoadingState";
import HoverDetails from "./HoverDetails";

interface ModelViewerProps {
  modelPath: string;
}

const ModelViewer = ({ modelPath }: ModelViewerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Log the model path to help with debugging
  console.log("ModelViewer using path:", modelPath);
  
  const { isModelLoaded } = useThreeJsScene(
    modelPath,
    canvasRef,
    setLoadingProgress
  );

  return (
    <div className="relative w-full h-screen">
      {!isModelLoaded && (
        <LoadingState progress={loadingProgress} />
      )}
      <canvas ref={canvasRef} className="w-full h-full" />
      {isModelLoaded && <HoverDetails />}
    </div>
  );
};

export default ModelViewer;
