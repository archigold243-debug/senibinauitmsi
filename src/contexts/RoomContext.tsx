import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LECTURERS } from "@/pages/lecturers-data";

interface RoomData {
  id: string;
  currentName: string;
  description: string;
  floor: string;
  position: [number, number, number];
}

interface LecturerData {
  id: string;
  displayName: string;
  surname: string;
  role: string;
  photo: string;
  floor: string;
  roomId: string;
}

interface RoomContextType {
  studios: RoomData[];
  namedRooms: RoomData[];
  updateStudioName: (id: string, newName: string) => void;
  updateRoomName: (id: string, newName: string) => void;
  lecturers: LecturerData[];
  updateLecturer: (id: string, updates: Partial<LecturerData>) => void;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoomContext must be used within a RoomProvider');
  }
  return context;
};

export const RoomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [studios, setStudios] = useState<RoomData[]>([
    // Ground Floor Studios
    { id: 'studio-08b', currentName: 'Studio 08B', description: 'Max Pax= 30. Fixed Workstation, 3 AC, Projector', floor: 'Ground Floor', position: [27, 2, 3] },
    { id: 'studio-master-01', currentName: 'Studio Master 01', description: 'Max Pax= 25. 24 hours operational Studio, Fixed Workstation, Projector', floor: 'Ground Floor', position: [-4, 2, -3] },
    { id: 'studio-master-03', currentName: 'Studio Master 03', description: 'Max Pax= 25. 24 hours operational Studio, Fixed Workstation, Projector', floor: 'Ground Floor', position: [9, 2, -3] },
    { id: 'studio-08a', currentName: 'Studio 08A', description: 'Max Pax= 30. Fixed Workstation, 3 AC, Projector', floor: 'Ground Floor', position: [-22, 2, -3] },
    { id: 'studio-master-04', currentName: 'Studio Master 04', description: 'Max Pax= 25. 24 hours operational Studio, Fixed Workstation, Projector', floor: 'Ground Floor', position: [-2, 2, 20] },
    { id: 'studio-master-02', currentName: 'Studio Master 02', description: 'Max Pax= 25. 24 hours operational Studio, Fixed Workstation, Projector', floor: 'Ground Floor', position: [13, 2, 20] },
    
    // First Floor Studios
    { id: 'studio-01a', currentName: 'Studio 01A', description: 'Max Pax =30, 2 AC split unit, Projector', floor: 'First Floor', position: [24, 6, 2] },
    { id: 'studio-03a-extended', currentName: 'Studio 03A extended', description: 'Max Pax =30, 2 AC split unit, Non projector', floor: 'First Floor', position: [24, 6, -10] },
    { id: 'studio-03a', currentName: 'Studio 03A', description: 'Max Pax =30, 2 AC split unit, Projector', floor: 'First Floor', position: [24, 6, -20] },
    { id: 'studio-07a', currentName: 'Studio 07A', description: 'Max Pax =30, Fixed Work Station 3 AC split unit, Projector.', floor: 'First Floor', position: [-12, 6, 15] },
    
    // Second Floor Studios
    { id: 'studio-2a', currentName: 'Studio 2A', description: 'Max Pax= 28. Projector', floor: 'Second Floor', position: [25, 8, -12] },
    { id: 'studio-2b', currentName: 'Studio 2B', description: 'Max Pax= 28. Projector', floor: 'Second Floor', position: [-25, 8, -12] },
    
    // Third Floor Studios
    { id: 'studio-3a', currentName: 'Studio 05A', description: 'Fixed Work Station 3 AC split unit, Projector', floor: 'Third Floor', position: [-8, 12, 13] },
    { id: 'studio-3b', currentName: 'Studio 04A', description: 'Fixed Work Station 3 AC split unit, Projector', floor: 'Third Floor', position: [11, 12, 13] },
    
    // Fourth Floor Studios
    { id: 'studio-4c', currentName: 'Studio 4C', description: 'Max Pax =28. Projector', floor: 'Fourth Floor', position: [25, 16, -12] },
  ]);

  const [namedRooms, setNamedRooms] = useState<RoomData[]>([
    // Second Floor Rooms
    { id: 'crit-main', currentName: 'Bilik Krit Utama', description: 'Main critique room with projector', floor: 'Second Floor', position: [0, 10, 0] },
    
    // First Floor Rooms
    { id: 'crit-small', currentName: 'Bilik Krit Kecil', description: 'Small critique room', floor: 'First Floor', position: [15, 8, 0] },
    { id: 'crit-tec', currentName: 'Bilik Krit TEC', description: 'Use for Crtique Sessions, Wrap up, Lectures, Projector, AP1 132', floor: 'First Floor', position: [11, 6, 15] },
    
    // Fourth Floor Rooms
    { id: 'surau-l', currentName: 'Surau L', description: '5 times Appoinment with Allah', floor: 'Fourth Floor', position: [20, 16, 15] },
    { id: 'surau-p', currentName: 'Surau P', description: '5 times Appoinment with Allah', floor: 'Fourth Floor', position: [-20, 16, 15] },
  ]);

  // Import all lecturers from lecturers-data.ts; assign id from roomId if not present
  const [lecturers, setLecturers] = useState<LecturerData[]>(
    LECTURERS.map((l) => ({
      ...l,
      id: l.roomId ?? l.displayName.replace(/\s+/g, '').toLowerCase(),
    }))
  );

  const updateStudioName = (id: string, newName: string) => {
    setStudios(prev => prev.map(studio => 
      studio.id === id ? { ...studio, currentName: newName } : studio
    ));
  };

  const updateRoomName = (id: string, newName: string) => {
    setNamedRooms(prev => prev.map(room => 
      room.id === id ? { ...room, currentName: newName } : room
    ));
  };

  const updateLecturer = (id: string, updates: Partial<LecturerData>) => {
    setLecturers((prev) =>
      prev.map((lect) => (lect.id === id ? { ...lect, ...updates } : lect))
    );
  };

  return (
    <RoomContext.Provider value={{ studios, namedRooms, updateStudioName, updateRoomName, lecturers, updateLecturer }}>
      {children}
    </RoomContext.Provider>
  );
};
export default RoomContext;
