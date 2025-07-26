import React, { useState } from "react";

interface ExpertiseFilterProps {
  onChange: (expertiseId: string) => void;
}

const ExpertiseFilter: React.FC<ExpertiseFilterProps> = ({ onChange }) => {
  const [selectedExpertise, setSelectedExpertise] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedExpertise(value);
    onChange(value); // pass selected expertise ID to parent component
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="expertise-select" style={{ marginRight: "0.5rem" }}>
        Filter by Expertise:
      </label>
      <select
        id="expertise-select"
        value={selectedExpertise}
        onChange={handleChange}
      >
        <option value="">All</option>
        <option value="1">Culture & Heritage</option>
        <option value="2">Spatial Behavior & Psychology</option>
        <option value="3">Construction & Materials</option>
        <option value="4">Housing, Planning & Urban Design</option>
        <option value="5">Green Sustainable Architecture</option>
        <option value="6">Digital Technology & Architecture</option>
        <option value="7">Building Science & Performance</option>
        <option value="8">Resilient Architecture & Building Safety</option>
        <option value="9">Architectural Design Theory & Education</option>
        <option value="10">Architectural Practice & Project Management</option>
      </select>
    </div>
  );
};

export default ExpertiseFilter;
