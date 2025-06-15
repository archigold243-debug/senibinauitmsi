
import React from 'react';
import Layout from '@/components/Layout';
import ModelViewer from '@/components/ModelViewer';
import HoverDetails from '@/components/HoverDetails';
import { useRoomContext } from '@/contexts/RoomContext';
import { useSearchParams } from "react-router-dom";

// RoomId to position mapping for Fourth Floor
const roomIdToPosition: Record<string, [number, number, number]> = {
  "studio-4c": [25, 16, -12],
  "surau-l": [20, 16, 15],
  "surau-p": [-20, 16, 15],
  "farid": [-17, 16, 15],
  "mamoo": [-14, 16, 15],
  "syathir": [-2, 16, 15],
  "saha": [1, 16, 15],
  "jamal": [7, 16, 15],
  "aiman": [10, 16, 15],
  "izzat": [13, 16, 15],
  "unoccupied": [-17, 16, 10],
  "ar": [-14, 16, 10],
  "mizi": [-11, 16, 10],
  "shahin": [-2, 16, 10],
  "baa": [10, 16, 10],
  "classroom-403": [-25, 16, 3],
  "classroom-439": [25, 16, 3],
};

const FourthFloor = () => {
  const { studios, namedRooms } = useRoomContext();
  const [params] = useSearchParams();
  const targetRoomId = params.get("room")?.toLowerCase() ?? undefined;
  const targetRoomPosition = targetRoomId && roomIdToPosition[targetRoomId] ? roomIdToPosition[targetRoomId] : undefined;

  const getStudioName = (id: string) => {
    const studio = studios.find(s => s.id === id);
    return studio ? studio.currentName : '';
  };

  const getRoomName = (id: string) => {
    const room = namedRooms.find(r => r.id === id);
    return room ? room.currentName : '';
  };

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
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 animate-scale-up">
            <ModelViewer modelSrc="Annex14F.gltf" targetRoomPosition={targetRoomPosition}>
              <HoverDetails
                title={getStudioName('studio-4c')}
                roomId="studio-4c"
                description="Max Pax =28. Projector"
                position="right"
                modelPosition={[25, 16, -12]}
                isHighlighted={targetRoomId === "studio-4c"}
                autoOpen={targetRoomId === "studio-4c"}
              />
              <HoverDetails
                title={getRoomName('surau-l')}
                roomId="surau-l"
                description="5 times Appoinment with Allah"
                position="left"
                modelPosition={[20, 16, 15]}
                isHighlighted={targetRoomId === "surau-l"}
                autoOpen={targetRoomId === "surau-l"}
              />
              <HoverDetails
                title={getRoomName('surau-p')}
                roomId="surau-p"
                description="5 times Appoinment with Allah"
                position="top"
                modelPosition={[-20, 16, 15]}
                isHighlighted={targetRoomId === "surau-p"}
                autoOpen={targetRoomId === "surau-p"}
              />
              <HoverDetails
                title="Dr FARID AL HAKEEM"
                surname="YUSERRIE"
                description="Senior Lecturer"
                position="right"
                modelPosition={[-17, 16, 15]}
                imageSrc="Farid.jpg"
                roomId="farid"
                isHighlighted={targetRoomId === "farid"}
                autoOpen={targetRoomId === "farid"}
              />
              <HoverDetails
                title="En AHMAD FAIZ"
                surname="MOHD NAZAMUDIN"
                description="Lecturer"
                position="right"
                modelPosition={[-14, 16, 15]}
                imageSrc="Mamoo.jpg"
                roomId="mamoo"
                isHighlighted={targetRoomId === "mamoo"}
                autoOpen={targetRoomId === "mamoo"}
              />
              <HoverDetails
                title="En MOHAMMAD SYATHIR AMINI"
                surname="SHAHBUDIN"
                description="Lecturer"
                position="right"
                modelPosition={[-2, 16, 15]}
                imageSrc="Syathir.jpg"
                roomId="syathir"
                isHighlighted={targetRoomId === "syathir"}
                autoOpen={targetRoomId === "syathir"}
              />
              <HoverDetails
                title="En SALAHUDDIN ABDUL HAKEEM"
                surname="ABAS"
                description="Lecturer"
                position="right"
                modelPosition={[1, 16, 15]}
                imageSrc="Saha.jpg"
                roomId="saha"
                isHighlighted={targetRoomId === "saha"}
                autoOpen={targetRoomId === "saha"}
              />
              <HoverDetails
                title="Ar. Dr JAMALUDIN"
                surname="MUHAMAD"
                description="Senior Lecturer"
                position="right"
                modelPosition={[7, 16, 15]}
                imageSrc="Jamal.jpg"
                roomId="jamal"
                isHighlighted={targetRoomId === "jamal"}
                autoOpen={targetRoomId === "jamal"}
              />
              <HoverDetails
                title="Dr SAYED MUHAMMAD AIMAN"
                surname="SAYED ABUL KHAIR"
                description="Senior Lecturer"
                position="right"
                modelPosition={[10, 16, 15]}
                imageSrc="Aiman.jpg"
                roomId="aiman"
                isHighlighted={targetRoomId === "aiman"}
                autoOpen={targetRoomId === "aiman"}
              />
              <HoverDetails
                title="Ts. IZZAT"
                surname="ANUAR"
                description="Lecturer"
                position="right"
                modelPosition={[13, 16, 15]}
                imageSrc="Izzat.jpg"
                roomId="izzat"
                isHighlighted={targetRoomId === "izzat"}
                autoOpen={targetRoomId === "izzat"}
              />
              <HoverDetails
                title="unoccupied"
                surname="-"
                description="-"
                position="right"
                modelPosition={[-17, 16, 10]}
                roomId="unoccupied"
                isHighlighted={targetRoomId === "unoccupied"}
                autoOpen={targetRoomId === "unoccupied"}
              />
              <HoverDetails
                title="En ABDUL RAHMAN"
                surname="KHAMARUZAMAN"
                description="Lecturer"
                position="right"
                modelPosition={[-14, 16, 10]}
                imageSrc="AR.jpg"
                roomId="ar"
                isHighlighted={targetRoomId === "ar"}
                autoOpen={targetRoomId === "ar"}
              />
              <HoverDetails
                title="Ar. MUHAMMAD ASSYAHMIZI"
                surname="MOHD YUNUS"
                description="Senior Lecturer"
                position="right"
                modelPosition={[-11, 16, 10]}
                imageSrc="Mizi.png"
                roomId="mizi"
                isHighlighted={targetRoomId === "mizi"}
                autoOpen={targetRoomId === "mizi"}
              />
              <HoverDetails
                title="En MOHAMAD SHAHIN"
                surname="SHAHDAN"
                description="Lecturer"
                position="right"
                modelPosition={[-2, 16, 10]}
                imageSrc="Shahin.jpg"
                roomId="shahin"
                isHighlighted={targetRoomId === "shahin"}
                autoOpen={targetRoomId === "shahin"}
              />
              <HoverDetails
                title="En MUHAMMAD FARIS"
                surname="ARMAN"
                description="Lecturer"
                position="right"
                modelPosition={[10, 16, 10]}
                imageSrc="Baa.jpeg"
                roomId="baa"
                isHighlighted={targetRoomId === "baa"}
                autoOpen={targetRoomId === "baa"}
              />
              <HoverDetails
                title="Classroom"
                description="Max Pax= 40. Projector, AP1 403"
                position="right"
                modelPosition={[-25, 16, 3]}
                roomId="classroom-403"
                isHighlighted={targetRoomId === "classroom-403"}
                autoOpen={targetRoomId === "classroom-403"}
              />
              <HoverDetails
                title="Classroom"
                description="Max Pax= 40. Projector, AP1 439"
                position="right"
                modelPosition={[25, 16, 3]}
                roomId="classroom-439"
                isHighlighted={targetRoomId === "classroom-439"}
                autoOpen={targetRoomId === "classroom-439"}
              />
            </ModelViewer>
          </div>
          
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg p-6 shadow animate-slide-in-from-left">
              <h3 className="text-lg font-medium mb-2">Fourth Floor Specifications</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Lecturer Office: 12</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Studio: 1</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Other Amenities: 2 Classroom, Surau</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Toilet: 2</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 shadow animate-slide-in-from-right">
              <h3 className="text-lg font-medium mb-2">Key Features</h3>
              <p className="text-sm text-gray-600 mb-4">
                Climbing to the top is a challenge, thus there is where most of the lecturer's offices to send assignments, appointments, and many more reasons to be here.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Bird's eye view to the whole centre of the building</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>More air flow</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Peaceful floor</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Musolla for spiritual recharge</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FourthFloor;
