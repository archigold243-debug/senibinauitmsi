
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
              The ground floor features the main entrance, reception area, and initial collaborative spaces.
              Hover over the highlighted areas to learn more about each space.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 animate-scale-up">
            {/* Updated model path - make sure it's correct without leading slash */}
            <ModelViewer modelSrc="Annex 1GF.gltf">
              <HoverDetails
                title="Main Entrance"
                description="The primary entrance to the building featuring a spacious lobby and reception area."
                position="right"
                modelPosition={[10, 0, 15]}
              />
              <HoverDetails
                title="Meeting Rooms"
                description="Three configurable meeting rooms with state-of-the-art presentation equipment."
                position="top"
                modelPosition={[-10, 0, 10]}
              />
              <HoverDetails
                title="Café"
                description="A casual café offering refreshments and light meals throughout the day."
                position="left"
                modelPosition={[-15, 0, 0]}
              />
              <HoverDetails
                title="Collaborative Area"
                description="Open spaces designed for collaborative work and informal meetings."
                position="right"
                modelPosition={[15, 0, -10]}
              />
            </ModelViewer>
          </div>
          
          {/* Floor information section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg p-6 shadow animate-slide-in-from-left">
              <h3 className="text-lg font-medium mb-2">Ground Floor Specifications</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Reception Area: 500 sq ft</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Meeting Rooms: 3 (accommodating 4-12 people each)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Café Area: 800 sq ft with seating for 40</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Collaborative Spaces: 1,200 sq ft</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 shadow animate-slide-in-from-right">
              <h3 className="text-lg font-medium mb-2">Key Features</h3>
              <p className="text-sm text-gray-600 mb-4">
                The ground floor is designed to create a welcoming first impression and facilitate the flow of visitors and staff throughout the building.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Energy-efficient LED lighting throughout</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Smart building controls for climate and lighting</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Biophilic design elements with indoor plants</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Acoustic treatments for noise reduction</span>
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
