import React from 'react';
import Layout from '@/components/Layout';
import ModelViewer from '@/components/ModelViewer';
import HoverDetails from '@/components/HoverDetails';
import { useRoomContext } from '@/contexts/RoomContext';

const SecondFloor = () => {
  const modelPath = "Annex12F.gltf";
  const { namedRooms } = useRoomContext();
  
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
            <h1 className="text-3xl md:text-4xl font-light mb-4">Second Floor</h1>
            <p className="text-lg text-muted-foreground">
              This floor have Studios, Crit Rooms, Toilets (Purple, pink), Archi. Lecturer's Office (yellow), and Staff Lounge.
              Hover over the highlighted areas to learn more about each space.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 animate-scale-up">
            <ModelViewer modelSrc={modelPath}>
              <HoverDetails
                title="Studio 02A"
                description="Max Pax =30, 2 AC split unit, Projector"
                position="right"
                modelPosition={[24, 8, 2]} 
              />
              <HoverDetails
                title="Studio 02B"
                description="Max Pax =30, 2 AC split unit, Non projector"
                position="right"                
                modelPosition={[24, 8, -10]} 
              />
              <HoverDetails
                title="Staff Lounge"
                description="Max Pax =30, 2 AC split unit, Projector, AP1 232"
                position="bottom"                
                modelPosition={[-17, 8, 15]} 
              />
              <HoverDetails
                title="Studio 02C"
                description="Max Pax =35, 4 AC, Projector"
                position="bottom"
                modelPosition={[11, 8, 15]} 
              />
              <HoverDetails
                title="Studio 02D"
                description="Max Pax =28, 3 AC split unit, Projector."
                position="right"
                modelPosition={[-8, 8, 15]} 
              />
              <HoverDetails
                title={getRoomName('crit-main')}
                description="Use for Crtique Sessions, Wrap up, Lectures, Projector, AP1 224"
                position="bottom"
                modelPosition={[-24, 8, 0]} 
              />
              <HoverDetails
                title="Dr FAZIDAH HANIM"
                surname="HUSAIN"
                description="Senior Lecturer"
                position="right"                
                modelPosition={[10, 8, -8]} 
                imageSrc="Hanim.jpg"
              />
              <HoverDetails
                title="En MOHAMMAD NAZRIN"
                surname="ZAINAL ABIDIN"
                description="Lecturer"
                position="right"                
                modelPosition={[10, 8, -15]}
                imageSrc="YEN.jpg"
              />
              <HoverDetails
                title="Dr MAYAMIN"
                surname="YUHANIZ"
                description="Senior Lecturer"
                position="right"                
                modelPosition={[5, 8, -20]} 
                imageSrc="Maya.jpg"
              />
              <HoverDetails
                title="Ar. IZNNY"
                surname="ISMAIL"
                description="Senior Lecturer"
                position="right"                
                modelPosition={[16, 8, -8]}
                imageSrc="Iznny.jpg"
              />
              <HoverDetails
                title="En MD ANWAR"
                surname="MD YUSOF"
                description="Senior Lecturer"
                position="right"                
                modelPosition={[-8, 8, -15]}
                imageSrc="Anwar.jpg"
              />
              <HoverDetails
                title="Dr NOR SYAMIMI"
                surname="SAMSUDIN"
                description="Senior Lecturer"
                position="right"                
                modelPosition={[-18, 8, -8]}
                imageSrc="Mimi.jpg"
              />
              <HoverDetails
                title="Dr FADHLIZIL FARIZ"
                surname="ABDUL MUNIR"
                description="Senior Lecturer"
                position="right"                
                modelPosition={[-15, 8, -8]} 
                imageSrc="Fariz.jpg"
              />
              <HoverDetails
                title="En AMIRUL AMIN"
                surname="ISMAIL"
                description="Senior Lecturer"
                position="right"                
                modelPosition={[-8, 8, -8]}
                imageSrc="Amin.jpg"
              />
              <HoverDetails
                title="En AMRAN"
                surname="ABDUL RAHIM"
                description="Senior Lecturer"
                position="right"                
                modelPosition={[-11, 8, -8]}
                imageSrc="Amran.jpg"
              />
              <HoverDetails
                title="En ADEEB"
                surname="ZULKIFLI"
                description="Senior Lecturer"
                position="right"                
                modelPosition={[-18, 8, -15]}
                imageSrc="Adeeb.jpg"
              />
              <HoverDetails
                title="Dr IRYANI"
                surname="ABDUL HALIM CHOO"
                description="Senior Lecturer"
                position="right"                
                modelPosition={[-15, 8, -15]}
                imageSrc="Iryani.jpg"
              />
              <HoverDetails
                title="unoccupied"
                description="Senior Lecturer"
                position="right"                
                modelPosition={[-11, 8, -15]} 
              />
            </ModelViewer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg p-6 shadow animate-slide-in-from-left">
              <h3 className="text-lg font-medium mb-2">Second Floor Specifications</h3>
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
                  <span>Studio: 4</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Other Amenities: Staff Lounge, Crit Room</span>
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
                Great view to the stage/open gallery area
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Biophilic design elements</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Optimum view into the courtyard that can see all the activities happening</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>---</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>----</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SecondFloor;
