
import React from 'react';

const FourthFloorSpecsCard: React.FC = () => (
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
);

export default FourthFloorSpecsCard;
