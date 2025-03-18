
import React from 'react';
import Layout from '@/components/Layout';
import ModelViewer from '@/components/ModelViewer';
import HoverDetails from '@/components/HoverDetails';

const FourthFloor = () => {
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
            <ModelViewer modelSrc="Annex14F.gltf">
              <HoverDetails
                title="Studio 4A/B"
                description="Max Pax =28. Projector"
                position="right"
                modelPosition={[25, 16, -12]} 
              />
              <HoverDetails
                title="Surau L"
                description="5 times Appoinment with Allah"
                position="left"
                modelPosition={[20, 16, 15]} 
              />
              <HoverDetails
                title="Surau P"
                description="5 times Appoinment with Allah"
                position="top"
                modelPosition={[-20, 16, 15]} 
              />
              <HoverDetails
                title="Dr FARID AL HAKEEM"
                surname="YUSERRIE"
                description="Senior Lecturer"
                position="right"
                modelPosition={[-17, 16, 15]}
                imageSrc="Farid.jpg"
              />
              <HoverDetails
                title="En AHMAD FAIZ"
                surname="MOHD NAZAMUDIN"
                description="Lecturer"
                position="right"
                modelPosition={[-14, 16, 15]}
                imageSrc="Mamoo.jpg"
              />
              <HoverDetails
                title="En MOHAMMAD SYATHIR AMINI"
                surname="SHAHBUDIN"
                description="Lecturer"
                position="right"
                modelPosition={[-2, 16, 15]}
                imageSrc="Syathir.jpg"
              />
              <HoverDetails
                title="En SALAHUDDIN ABDUL HAKEEM"
                surname="ABAS"
                description="Lecturer"
                position="right"
                modelPosition={[1, 16, 15]}
                imageSrc="Saha.jpg"
              />
              <HoverDetails
                title="Ar. Dr JAMALUDIN"
                surname="MUHAMAD"
                description="Senior Lecturer"
                position="right"
                modelPosition={[7, 16, 15]}
                imageSrc="Jamal.jpg"
              />
              <HoverDetails
                title="Dr SAYED MUHAMMAD AIMAN"
                surname="SAYED ABUL KHAIR"
                description="Senior Lecturer"
                position="right"
                modelPosition={[10, 16, 15]} 
                imageSrc="Aiman.jpg"
              />
              <HoverDetails
                title="Ts. IZZAT"
                surname="ANUAR"
                description="Lecturer"
                position="right"
                modelPosition={[13, 16, 15]}
                imageSrc="Izzat.jpg"
              />
              <HoverDetails
                title="unoccupied"
                surname="-"
                description="-"
                position="right"
                modelPosition={[-17, 16, 10]} 
              />
              <HoverDetails
                title="En ABDUL RAHMAN"
                surname="KHAMARUZAMAN"
                description="Lecturer"
                position="right"
                modelPosition={[-14, 16, 10]}
                imageSrc="AR.jpg"
              />
              <HoverDetails
                title="Ar. MUHAMMAD ASSYAHMIZI"
                surname="MOHD YUNUS"
                description="Senior Lecturer"
                position="right"
                modelPosition={[-11, 16, 10]}
                imageSrc="Mizi.png"
              />
              <HoverDetails
                title="En MOHAMAD SHAHIN"
                surname="SHAHDAN"
                description="Lecturer"
                position="right"
                modelPosition={[-2, 16, 10]}
                imageSrc="Shahin.jpg"
              />
              <HoverDetails
                title="En MUHAMMAD FARIS"
                surname="ARMAN"
                description="Lecturer"
                position="right"
                modelPosition={[10, 16, 10]} 
                imageSrc="Baa.jpeg"
              />
              <HoverDetails
                title="Classroom"
                description="Max Pax= 40. Projector, AP1 403"
                position="right"
                modelPosition={[-25, 16, 3]} 
              />
              <HoverDetails
                title="Classroom"
                description="Max Pax= 40. Projector, AP1 439"
                position="right"
                modelPosition={[25, 16, 3]} 
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
