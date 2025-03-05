import React from 'react';
import Layout from '@/components/Layout';
import ModelViewer from '@/components/ModelViewer';
import HoverDetails from '@/components/HoverDetails';

const ThirdFloor = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <div className="inline-block px-3 py-1 mb-2 text-xs font-medium uppercase tracking-wider text-primary bg-primary/5 rounded-full">
              Floor Plan
            </div>
            <h1 className="text-3xl md:text-4xl font-light mb-4">Third Floor</h1>
            <p className="text-lg text-muted-foreground">
              This floor have Studios, Crit Rooms, Toilets (Purple, pink), Archi. Lecturer's Office (yellow), and Staff Lounge.
              Hover over the highlighted areas to learn more about each space.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 animate-scale-up">
            <ModelViewer modelSrc="Annex 13F.gltf">
              <HoverDetails
                title="Classroom"
                description="Max pax= 40"
                position="right"
                modelPosition={[24, 12, 2]}
              />
              <HoverDetails
                title="Studio 05A"
                description="Fixed Work Station 3 AC split unit, Projector"
                position="left"
                modelPosition={[-8, 12, 13]}
              />
              <HoverDetails
                title="Studio 04A"
                description="Fixed Work Station 3 AC split unit, Projector"
                position="top"
                modelPosition={[11, 12, 13]}
              />
              <HoverDetails
                title="Floating Studio 05"
                description="Open Area"
                position="right"
                modelPosition={[-15, 12, -10]}
              />
              <HoverDetails
                title="Classroom"
                description="Max pax= 40"
                position="left"
                modelPosition={[-24, 12, 0]}
              />
              <HoverDetails
                title="Studio 05B"
                description="Max Pax= 25, Fixed Work Station 3 AC split unit, Projector"
                position="bottom"
                modelPosition={[-24, 12, -10]} 
              />
              <HoverDetails
                title="Studio 04B"
                description="Max Pax =30, Fixed Work Station 3 AC split unit, Projector"
                position="right"
                modelPosition={[24, 12, -10]} 
              />
               <HoverDetails
                title="Floating Studio 04"
                description="Max Pax =30, Fixed Work Station 3 AC split unit, Projector"
                position="right"
                modelPosition={[13, 12, -10]} 
              />
            </ModelViewer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg p-6 shadow animate-slide-in-from-left">
              <h3 className="text-lg font-medium mb-2">Third Floor Specifications</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Total area: 9,800 sq ft</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Ceiling height: 12 ft</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>5 executive offices with private areas</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Premium finishes and materials</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 shadow animate-slide-in-from-right">
              <h3 className="text-lg font-medium mb-2">Key Features</h3>
              <p className="text-sm text-gray-600 mb-4">
                The third floor projects an image of success and professionalism with premium materials and amenities for executives and special guests.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Sound-insulated walls for privacy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Custom lighting controls</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Integrated climate control</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Dedicated executive elevator</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ThirdFloor;
