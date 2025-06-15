
import React from 'react';

const FourthFloorFeaturesCard: React.FC = () => (
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
);

export default FourthFloorFeaturesCard;
