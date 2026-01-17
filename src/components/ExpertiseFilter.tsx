import React, { useState } from "react";

interface ExpertiseFilterProps {
  onChange: (expertiseId: string) => void;
}

const ExpertiseFilter: React.FC<ExpertiseFilterProps> = ({ onChange }) => {
  const [selectedExpertise, setSelectedExpertise] = useState("");

  const EXPERTISE_OPTIONS = [
    { id: "1", label: "Culture & Heritage", description: "Cultural Context and Social Identities in Architecture | Cultural and Social Factors in Architecture | Regionalism and Identity| Historic Building Restoration, Preservation and Conservation| Documentation and Preservation| Adaptive Reuse| Vernacular Architecture in the Modern Context| Traditional, Vernacular & Indigenous Architecture| Tourism & Vernacular Architecture| History and Theory of Architecture| Cultural Heritage and Identity | Cultural Landscapes and Vernacular Land Use" },
    { id: "2", label: "Spatial Behavior & Psychology", description: "Spatial Analysis and Behavior Modeling| Spatial & Formal Typology in Architecture | Space Planning and Efficiency | Spatial Sequence and Flow | Spatial Flexibility | Spatial Hierarchy and Order | Space and User Experience | Wayfinding and Navigation| Walkability | Healthcare and Healing Environments| Environmental Psychology| Public Space and Social Interaction| Public Space Design and Placemaking | Community Engagement & Participatory Design | Human-Centered Design | Spatial Perception & Evaluation | Responsive Environment | Spatial Syntax Analysis | Crime Prevention Through Environmental Design (CPTED)" },
    { id: "3", label: "Construction & Materials", description: "Building Technology & Materials | Sustainability & Traditional Building Techniques | Traditional Materials & Construction Methods | Architectural Components & Materials | Façade Design & Cladding Systems | Roofing Systems and Techniques | Window & Door Design | Building & Structural Detailing | Interior Design & Detailing | Building Envelope and Insulation | Detailing for Sustainability | Innovative Building Details" },
    { id: "4", label: "Housing, Planning & Urban Design", description: "Urban Planning & Design | Low-cost & Affordable Housing | Landscape Architecture | Student & Social Housing | Density & Urban Behavior | Traditional Urban Planning & Settlement Patterns| Residential Adaptation & Aging in Place | Housing Typologies | Housing for Aging Populations | Rural Housing & Settlements | Smart Housing Technologies | Housing Policy & Regulations | Housing Design, Health & Well-being  | Transit-Oriented Development (TOD) | Density & Mixed-Use Development | Urban Placemaking" },
    { id: "5", label: "Green Sustainable Architecture", description: "Sustainable Design & Green Building | Building Performance & Energy Efficiency | Biomimicry & Biophilic Design | Passive Design | Renewable Energy Integration | Green Roof & Living Wall Systems | Rainwater Harvesting & Greywater Recycling | Net Zero Energy & Carbon-Neutral Buildings | Smart Building Technologies | Indoor Air Quality (IAQ) & Health | Resilient and Climate-Adaptive Design" },
    { id: "6", label: "Digital Technology & Architecture", description: "Virtual Reality (VR) and Augmented Reality (AR) in Architecture | Digital Fabrication and 3D Printing | BIM and Digital Detailing | Digital Design and Building Information Modeling (BIM) | Digital Design Processes | Parametric and Algorithmic Design | Simulation and Performance Analysis | Data-Driven Design | Responsive and Interactive Architecture | Digital Visualization and Rendering" },
    { id: "7", label: "Building Science & Performance", description: "Acoustic and Lighting Design | Workspace Design and Productivity | Heating, Ventilation, and Air Conditioning (HVAC) Systems | Acoustic Design and Soundproofing | Post-Occupancy Evaluation (POE) | Building Envelope and Thermal Comfort | Universal Design and Accessibility | Ergonomics and Human Factors | Indoor Environmental Quality (IEQ) | Building Performance Simulation | Moisture and Durability Analysis | Lighting Design and Fixtures" },
    { id: "8", label: "Resilient Architecture & Building Safety", description: "Disaster Resilience and Emergency Architecture | Post-Disaster Reconstruction and Humanitarian Architecture | Waterfront and Coastal Design | Fire Safety and Building Codes | Building and Construction Safety | Crime Prevention Through Environmental Design (CPTED)" },
    { id: "9", label: "Architectural Design Theory & Education", description: "Architectural Design Process | Interdisciplinary Education | Digital Design Tools and Technology Integration | Design Studio Pedagogy | Design Critique and Feedback | Portfolio Development and Presentation Skills | Experiential Learning and Field Studies | Design Thinking and Problem-Solving | Design Assessment and Evaluation | Innovative Teaching Methods | Assessment of Student Outcomes" },
    { id: "10", label: "Architectural Practice & Project Management", description: "Collaborative Project Delivery | Building Codes and Standards Compliance | Project Delivery Methods | Professional Practice and Ethics | Client Relationship Management | Legal and Contractual Issues | Architectural Office Management | Construction & Contract Management | Project Documentation & Information Management" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedExpertise(value);
    // Find the label for the selected ID and pass it to parent for filtering
    const selectedOption = EXPERTISE_OPTIONS.find(opt => opt.id === value);
    onChange(selectedOption ? selectedOption.label : '');
  };

  const selectedOption = EXPERTISE_OPTIONS.find(opt => opt.id === selectedExpertise);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="expertise-select" style={{ marginRight: "0.5rem" }}>
        Filter by Research Interest:
      </label>
      <select
        id="expertise-select"
        value={selectedExpertise}
        onChange={handleChange}
      >
        <option value="">All</option>
        {EXPERTISE_OPTIONS.map(opt => (
          <option key={opt.id} value={opt.id}>{opt.label}</option>
        ))}
      </select>
      {selectedOption && (
        <div style={{ marginTop: "0.75rem", color: "#555", fontSize: "0.95rem" }}>
          <strong>{selectedOption.label}:</strong> {selectedOption.description}
        </div>
      )}
    </div>
  );
};

export default ExpertiseFilter;
