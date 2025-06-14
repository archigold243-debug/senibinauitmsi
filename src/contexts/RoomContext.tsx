
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RoomData {
  id: string;
  currentName: string;
  description: string;
  floor: string;
  position: [number, number, number];
}

interface RoomContextType {
  studios: RoomData[];
  namedRooms: RoomData[];
  updateStudioName: (id: string, newName: string) => void;
  updateRoomName: (id: string, newName: string) => void;
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
    { id: 'studio-1a', currentName: 'Studio 1A', description: 'Max Pax= 28. Projector', floor: 'Ground Floor', position: [25, 4, -12] },
    { id: 'studio-1b', currentName: 'Studio 1B', description: 'Max Pax= 28. Projector', floor: 'Ground Floor', position: [-25, 4, -12] },
    { id: 'studio-2a', currentName: 'Studio 2A', description: 'Max Pax= 28. Projector', floor: 'First Floor', position: [25, 8, -12] },
    { id: 'studio-2b', currentName: 'Studio 2B', description: 'Max Pax= 28. Projector', floor: 'First Floor', position: [-25, 8, -12] },
    { id: 'studio-3a', currentName: 'Studio 05A', description: 'Fixed Work Station 3 AC split unit, Projector', floor: 'Third Floor', position: [-8, 12, 13] },
    { id: 'studio-3b', currentName: 'Studio 04A', description: 'Fixed Work Station 3 AC split unit, Projector', floor: 'Third Floor', position: [11, 12, 13] },
    { id: 'studio-4c', currentName: 'Studio 4C', description: 'Max Pax =28. Projector', floor: 'Fourth Floor', position: [25, 16, -12] },
  ]);

  const [namedRooms, setNamedRooms] = useState<RoomData[]>([
    { id: 'crit-main', currentName: 'Bilik Krit Utama', description: 'Main critique room with projector', floor: 'Second Floor', position: [0, 10, 0] },
    { id: 'crit-small', currentName: 'Bilik Krit Kecil', description: 'Small critique room', floor: 'First Floor', position: [15, 8, 0] },
    { id: 'surau-l', currentName: 'Surau L', description: '5 times Appoinment with Allah', floor: 'Fourth Floor', position: [20, 16, 15] },
    { id: 'surau-p', currentName: 'Surau P', description: '5 times Appoinment with Allah', floor: 'Fourth Floor', position: [-20, 16, 15] },
  ]);

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

  return (
    <RoomContext.Provider value={{ studios, namedRooms, updateStudioName, updateRoomName }}>
      {children}
    </RoomContext.Provider>
  );
};
