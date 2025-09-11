import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useRoomContext } from "@/contexts/RoomContext";

const StudioPlan = () => {
  const { rooms } = useRoomContext();

  // Common style for all labels
  const baseLabelStyle: React.CSSProperties = {
    position: "absolute",
    background: "rgba(255,255,255,0.85)",
    padding: "2px 8px",
    borderRadius: "4px",
    fontWeight: 600,
    fontSize: "1rem",
    pointerEvents: "none",
    zIndex: 10,
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline">← Back</Button>
          </Link>
        </div>

        {/* Floor Plan Image */}
        <div className="text-center">
          <h2 className="text-2xl font-light mb-4">Studio Plan Overview</h2>
          <div className="relative inline-block">
            <img
              src="/images/studio-plan.png"
              alt="Architecture Studio Plan"
              className="max-w-full h-auto rounded-lg shadow-md"
            />
            {/* Render all room labels with location */}
            {rooms.map((room) => {
              // Expecting location as "left%,top%" e.g. "50%,81%"
              if (!room.location) return null;
              const [left, top] = room.location.split(",");
              return (
                <span
                  key={room.roomID}
                  style={{
                    ...baseLabelStyle,
                    left: left?.trim(),
                    top: top?.trim(),
                  }}
                >
                  {room.room_name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudioPlan;
