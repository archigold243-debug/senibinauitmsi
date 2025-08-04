import React, { useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import ModelViewer from '@/components/ModelViewer';
import GroundFloorHotspots from './GroundFloorHotspots';
import GroundFloorSpecsCard from './GroundFloorSpecsCard';
import GroundFloorFeaturesCard from './GroundFloorFeaturesCard';
import { useSearchParams } from "react-router-dom";

// Room position mapping for Ground Floor
const roomIdToPosition: Record<string, [number, number, number]> = {
  "ap1-004": [-14, 2, 4.5],     // Dr AZHAN
  "ap1-017": [17, 2, -7],       // En AHMAD FAISOL
  "ap1-019": [24, 2, -19],      // Ts. MOHD NASURUDIN
  "ap1-023": [32, 2, -7],       // Ts. Dr. WAN NUR RUKIAH
  "studio-08b": [27, 2, 3],
  "studio-master-01": [-4, 2, -3],
  "studio-master-03": [9, 2, -3],
  "studio-08a": [-22, 2, -3],
  "studio-master-04": [-2, 2, 20],
  "studio-master-02": [13, 2, 20],
  "arclab": [-22, 2, 10],
  "classroom-022": [30, 2, -15],
  "classroom-002": [-25, 2, -15]
};

const GroundFloor = () => {
  const [params] = useSearchParams();
  const targetRoomId = params.get("room")?.toLowerCase() ?? undefined;
  const targetRoomPosition =
    targetRoomId && roomIdToPosition[targetRoomId] ? roomIdToPosition[targetRoomId] : undefined;

  // --- ModelViewer auto-scroll-to-view logic ---
  const modelViewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (targetRoomId && modelViewerRef.current) {
      setTimeout(() => {
        modelViewerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  }, [targetRoomId]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <div className="inline-block px-3 py-1 mb-2 text-xs font-medium uppercase tracking-wider text-primary bg-primary/5 rounded-full">
              Floor Plan
            </div>
            <h1 className="text-3xl md:text-4xl font-light mb-4">Ground Floor</h1>
            <p className="text-lg text-muted-foreground">
              The ground floor features the Studios, Toilets (Purple, pink), Archi. Lecturer's Office (yellow), Courtyard, and public spaces.
              Hover over the highlighted areas to learn more about each space.
            </p>
          </div>
          
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 animate-scale-up"
            ref={modelViewerRef}
          >
            <ModelViewer modelSrc="Annex1GF.gltf" targetRoomPosition={targetRoomPosition}>
              <GroundFloorHotspots
                roomIdToPosition={roomIdToPosition}
                targetRoomId={targetRoomId}
              />
            </ModelViewer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <GroundFloorSpecsCard />
            <GroundFloorFeaturesCard />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GroundFloor;
