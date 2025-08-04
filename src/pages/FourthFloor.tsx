import React, { useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import ModelViewer from '@/components/ModelViewer';
import FourthFloorHotspots from './FourthFloorHotspots';
import FourthFloorSpecsCard from './FourthFloorSpecsCard';
import FourthFloorFeaturesCard from './FourthFloorFeaturesCard';
import { useSearchParams } from "react-router-dom";

// RoomId to position mapping for Fourth Floor
const roomIdToPosition: Record<string, [number, number, number]> = {
  "studio-4c": [25, 16, -12],
  "surau-l": [20, 16, 15],
  "surau-p": [-20, 16, 15],
  "ap1-412": [-17, 16, 15],    // Dr Farid
  "ap1-414": [-14, 16, 15],    // En Ahmad Faiz (Mamoo)
  "ap1-422": [-2, 16, 15],     // En Syathir
  "ap1-424": [1, 16, 15],      // En Saha
  "ap1-428": [7, 16, 15],      // Ar. Dr Jamaludin
  "ap1-430": [10, 16, 15],     // Dr Sayed Muhammad Aiman
  "ap1-432": [13, 16, 15],     // Ts. Izzat
  "unoccupied": [-17, 16, 10],
  "ap1-413": [-14, 16, 10],    // En Abdul Rahman
  "ap1-415": [-11, 16, 10],    // Ar. Muhammad Assyahmizi (Mizi)
  "ap1-421": [-2, 16, 10],     // En Mohamad Shahin
  "ap1-429": [10, 16, 10],     // En Muhammad Faris (Baa)
  "classroom-403": [-25, 16, 3],
  "classroom-439": [25, 16, 3],
};

const FourthFloor = () => {
  const [params] = useSearchParams();
  const targetRoomId = params.get("room")?.toLowerCase() ?? undefined;
  const targetRoomPosition = targetRoomId && roomIdToPosition[targetRoomId] ? roomIdToPosition[targetRoomId] : undefined;

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
            <h1 className="text-3xl md:text-4xl font-light mb-4">Fourth Floor</h1>
            <p className="text-lg text-muted-foreground">
              This floor have a Studio, Toilets (Purple, pink), Archi. Lecturer's Office (yellow), and Classrooms.
              Explore the interactive elements to discover the details.
            </p>
          </div>
          
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 animate-scale-up"
            ref={modelViewerRef}
          >
            <ModelViewer modelSrc="Annex14F.gltf" targetRoomPosition={targetRoomPosition}>
              <FourthFloorHotspots
                roomIdToPosition={roomIdToPosition}
                targetRoomId={targetRoomId}
              />
            </ModelViewer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <FourthFloorSpecsCard />
            <FourthFloorFeaturesCard />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FourthFloor;
