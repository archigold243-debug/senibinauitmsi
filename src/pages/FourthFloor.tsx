
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
              The fourth floor features recreational areas and a rooftop garden, providing spaces for relaxation and events.
              Explore the interactive elements to discover the details.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 animate-scale-up">
            <ModelViewer modelSrc="Annex 14F.gltf">
              <HoverDetails
                title="Studio 4A/B"
                description="Max Pax =28. Projector"
                position="right"
                modelPosition={[25, 16, -20]} 
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
                title="Classroom"
                description="Max Pax= 40. Projector, AP1 403"
                position="right"
                modelPosition={[-25, 16, 3]} // Add 3D position coordinates for the wellness area
              />
              <HoverDetails
                title="Classroom"
                description="Max Pax= 40. Projector, AP1 439"
                position="left"
                modelPosition={[25, 16, 3]} // Add 3D position coordinates for the café and bar
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
                  <span>Total area: 13,500 sq ft (including outdoor space)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Ceiling height: Variable with skylights</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Outdoor garden: 5,000 sq ft</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Event capacity: Up to 200 people</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 shadow animate-slide-in-from-right">
              <h3 className="text-lg font-medium mb-2">Key Features</h3>
              <p className="text-sm text-gray-600 mb-4">
                The fourth floor is designed for employee well-being and company culture, with spaces that encourage relaxation, recreation, and community.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Weather-resistant outdoor furnishings</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Retractable glass walls for indoor/outdoor flow</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Sustainable irrigation system for garden</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Integrated audio-visual systems</span>
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
