
import React from 'react';
import Layout from '@/components/Layout';
import ModelViewer from '@/components/ModelViewer';
import HoverDetails from '@/components/HoverDetails';

const GroundFloor = () => {
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
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 animate-scale-up">
            <ModelViewer modelSrc="/Annex 1GF.gltf">
              <HoverDetails
                x={10}
                y={-30}
                title="Studio 08B"
                description="Max Pax= 30. Fixed Workstation. 3 AC"
                position="right"
                cardOffset={{ x: 0, y: 0 }}
                modelPosition={[25, 1, 2]} 
              />
              <HoverDetails
                x={10}
                y={-30}
                title="Studio Master 01"
                description="Max Pax= 25. 24 hours operational Studio. Fixed Workstation"
                position="right"
                cardOffset={{ x: 0, y: 0 }}
                modelPosition={[-2, 1, -6]}
              />
              <HoverDetails
                x={10}
                y={-30}
                title="Studio Master 03"
                description="Max Pax= 25. 24 hours operational Studio. Fixed Workstation"
                position="right"
                cardOffset={{ x: 0, y: 0 }}
                modelPosition={[9, 1, -6]}
              />
              <HoverDetails
                x={10}
                y={-30}
                title="Studio 08A"
                description="Max Pax= 30. Fixed Workstation. 3 AC"
                position="right"
                cardOffset={{ x: 0, y: 0 }}
                modelPosition={[-20, 1, -5]}
              />
              <HoverDetails
                x={10}
                y={-30}
                title="Studio Master 04"
                description="Max Pax= 25. 24 hours operational Studio. Fixed Workstation"
                position="right"
                cardOffset={{ x: 0, y: 0 }}
                modelPosition={[-2, 1, 20]}
              />
              <HoverDetails
                x={10}
                y={-30}
                title="Studio Master 02"
                description="Max Pax= 25. 24 hours operational Studio. Fixed Workstation"
                position="right"
                cardOffset={{ x: 0, y: 0 }}
                modelPosition={[13, 1, 20]}
               />
               <HoverDetails
                x={10}
                y={-30}
                title="Ts. Nasuruddin"
                description="Senior Lecturer"
                position="right"
                cardOffset={{ x: 0, y: 0 }}
                modelPosition={[23, 1, -20]}
               />
               <HoverDetails
                x={10}
                y={-30}
                title="En Faisol"
                description="Senior Lecturer"
                position="right"
                cardOffset={{ x: 0, y: 0 }}
                modelPosition={[18, 1, -8.5]}
                />
            </ModelViewer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg p-6 shadow animate-slide-in-from-left">
              <h3 className="text-lg font-medium mb-2">Ground Floor Specifications</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Total area: 12,500 sq ft</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Ceiling height: 14 ft</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>4 main entrances with accessibility features</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Public restrooms with touchless fixtures</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 shadow animate-slide-in-from-right">
              <h3 className="text-lg font-medium mb-2">Key Features</h3>
              <p className="text-sm text-gray-600 mb-4">
                The ground floor is designed to create an impressive first impression while facilitating efficient flow of visitors and employees.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Double-height atrium with natural lighting</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Digital wayfinding kiosks</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Living green wall feature</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Coffee shop and convenience store</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GroundFloor;
