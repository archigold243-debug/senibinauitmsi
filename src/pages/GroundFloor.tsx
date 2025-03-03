
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
              The ground floor features the main entrance, reception area, and public spaces.
              Hover over the highlighted areas to learn more about each space.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 animate-scale-up">
            <ModelViewer modelSrc="/Annex 1GF.glb">
              <HoverDetails
                x={25}
                y={30}
                title="Studio 08B"
                description="Max Pax= 30. Fixed Workstation. 3 AC"
                position="right"
                cardOffset={{ x: 10, y: -10 }}
                modelPosition={[33, 1, 2]} 
              />
              <HoverDetails
                x={50}
                y={40}
                title="Studio Master 01"
                description="MAx Pax= 25. 24 hours operational Studio. Fixed Workstation. "
                position="top"
                cardOffset={{ x: 0, y: 5 }}
                modelPosition={[-5, 1, -10]}
              />
              <HoverDetails
                x={75}
                y={60}
                title="Waiting Area"
                description="Comfortable seating area with modern furniture and amenities for visitors waiting for appointments."
                position="left"
                cardOffset={{ x: 10, y: -15 }}
                modelPosition={[1.5, 0, 0]}
              />
              <HoverDetails
                x={40}
                y={70}
                title="Elevators"
                description="Primary elevator bank providing access to all floors of the building."
                position="bottom"
                cardOffset={{ x: 0, y: 0 }}
                modelPosition={[0, 0, -1.2]}
              />
              <HoverDetails
                x={60}
                y={20}
                title="Security Office"
                description="Monitoring station for building security personnel with access to surveillance systems."
                position="right"
                cardOffset={{ x: 15, y: -10 }}
                modelPosition={[1.2, 0, 1.2]}
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
