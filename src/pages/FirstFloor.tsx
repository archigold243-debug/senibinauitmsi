
import React from 'react';
import Layout from '@/components/Layout';
import ModelViewer from '@/components/ModelViewer';
import HoverDetails from '@/components/HoverDetails';

const FirstFloor = () => {
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
              The first floor houses meeting rooms and collaborative workspaces.
              Explore the interactive model to discover the details of each space.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 animate-scale-up">
            <ModelViewer modelSrc="Annex 11F.gltf">
              <HoverDetails
                x={10}
                y={-30}
                title="Studio 01A"
                description="Max Pax =30, 2 AC split unit, Projector"
                position="right"
                cardOffset={{ x: 0, y: 0 }}
                modelPosition={[23, 6, 2]} 
              />
              <HoverDetails
                x={10}
                y={-30}
                title="Studio 03A extended"
                description="Max Pax =30, 2 AC split unit, Non projector"
                position="right"
                cardOffset={{ x: 0, y: 0 }}
                modelPosition={[23, 6, -10]} 
              />
              <HoverDetails
                x={10}
                y={-60}
                title="Studio 03A"
                description="Max Pax =30, 2 AC split unit, Projector"
                position="right"
                cardOffset={{ x: 0, y: 0 }}
                modelPosition={[23, 6, -20]} 
              />
              <HoverDetails
                x={20}
                y={70}
                title="Bilik Krit TEC"
                description="Used for Crtique Sessions, Wrap up,Llectures"
                position="right"
                cardOffset={{ x: 0, y: 0 }}
                modelPosition={[11, 6, 17]} 
              />
              <HoverDetails
                x={80}
                y={50}
                title="Studio 07A"
                description="Max Pax =30, Fixed Work Station 3 AC split unit, Projector."
                position="left"
                cardOffset={{ x: 0, y: 0 }}
                modelPosition={[-12, 6, 17]} 
              />
            </ModelViewer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg p-6 shadow animate-slide-in-from-left">
              <h3 className="text-lg font-medium mb-2">First Floor Specifications</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Total area: 10,800 sq ft</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Ceiling height: 10 ft</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>6 conference rooms of varying sizes</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>8 private phone booths</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 shadow animate-slide-in-from-right">
              <h3 className="text-lg font-medium mb-2">Key Features</h3>
              <p className="text-sm text-gray-600 mb-4">
                The first floor is optimized for meetings and collaborative work, with a focus on technology integration and flexibility.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Integrated room booking system</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Smart glass walls with privacy control</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Wireless charging stations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Adjustable lighting for different meeting types</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FirstFloor;
