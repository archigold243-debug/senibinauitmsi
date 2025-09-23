import React, { useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import ModelViewer from '@/components/ModelViewer';
import DynamicHotspots from '@/components/DynamicHotspots';
import FirstFloorSpecsCard from './FirstFloorSpecsCard';
import FirstFloorFeaturesCard from './FirstFloorFeaturesCard';
import { useSearchParams } from "react-router-dom";
import { useRoomContext } from '@/contexts/RoomContext';

const FirstFloor = () => {
  const { roomIdToPosition, loading } = useRoomContext();
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
       // Offset scroll by -80px (adjust as needed for your header height)
        window.scrollBy({ top: -80, left: 0, behavior: "smooth" });
      }, 120);
     }
   }, [targetRoomId]);

   if (loading) {
     return (
       <Layout>
         <div className="container mx-auto px-4 py-8">
           <div className="max-w-4xl mx-auto text-center">
             <p>Loading room data...</p>
           </div>
         </div>
       </Layout>
     );
   }

   return (
     <Layout>
       <div className="container mx-auto px-4 py-8">
         <div className="max-w-4xl mx-auto">
           <div className="mb-8 animate-fade-in">
             <div className="inline-block px-3 py-1 mb-2 text-xs font-medium uppercase tracking-wider text-primary bg-primary/5 rounded-full">
               Floor Plan
             </div>
             <h1 className="text-3xl md:text-4xl font-light mb-4">First Floor</h1>
             <p className="text-lg text-muted-foreground">
               This floor have Studios, Crit Rooms, Toilets (Purple, pink), Archi. Lecturer's Office (yellow), and Open Galery/Stage.
               Hover over the highlighted areas to learn more about each space.
             </p>
           </div>
           <div
             className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 animate-scale-up"
             ref={modelViewerRef}
           >
             <ModelViewer modelSrc="Annex11F.gltf" targetRoomPosition={targetRoomPosition}>
               <DynamicHotspots floor="First Floor" targetRoomId={targetRoomId} />
             </ModelViewer>
           </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <FirstFloorSpecsCard />
            <FirstFloorFeaturesCard />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FirstFloor;
