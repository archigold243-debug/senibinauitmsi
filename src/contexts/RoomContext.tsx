import React, { createContext, useContext, ReactNode } from 'react';
import { useRooms, Room, UserCredential } from '@/hooks/useRooms';

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
  photo: string;
  floor: string;
  roomID: string;
  expertise?: string | string[];
}

interface RoomContextType {
  studios: RoomData[];
  namedRooms: RoomData[];
  updateStudioName: (id: string, newName: string) => Promise<void>;
  updateRoomName: (id: string, newName: string) => Promise<void>;
  lecturers: LecturerData[];
  updateLecturer: (id: string, updates: Partial<LecturerData>) => void;
  lecturersLoading: boolean;
  lecturersError: string | null;
  roomIdToPosition: Record<string, [number, number, number]>;
  rooms: Room[];
  loading: boolean;
  error: string | null;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoomContext must be used within a RoomProvider');
  }
  return context;
};

// Helper function to convert Room to RoomData for compatibility
const convertRoomToRoomData = (room: Room): RoomData => ({
  id: room.roomID,
  currentName: room.room_name,
  description: room.description || '',
  floor: room.floor || '',
  position: room.position || [0, 0, 0],
});

// Helper function to convert UserCredential to LecturerData for compatibility  
const convertUserToLecturer = (user: UserCredential): LecturerData => ({
  id: user.id,
  displayName: user.displayName || '',
  surname: user.surname || '',
  photo: user.photo || '',
  floor: '', // You might want to get this from the room data
  roomID: user.roomID || user.room || '',
  expertise: user.expertise,
});

export const RoomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    rooms,
    lecturers: fetchedLecturers,
    loading,
    error,
    updateRoomName: updateRoomNameInDB,
    getStudioRooms,
    getNamedRooms,
    getRoomIdToPosition,
  } = useRooms();

  // Convert backend data to expected format for compatibility
  const studios = getStudioRooms().map(convertRoomToRoomData);
  const namedRooms = getNamedRooms().map(convertRoomToRoomData);
  const lecturers = fetchedLecturers.map(convertUserToLecturer);
  const roomIdToPosition = getRoomIdToPosition();

  const updateStudioName = async (id: string, newName: string) => {
    await updateRoomNameInDB(id, newName);
  };

  const updateRoomName = async (id: string, newName: string) => {
    await updateRoomNameInDB(id, newName);
  };

  const updateLecturer = (id: string, updates: Partial<LecturerData>) => {
    // This would need to be implemented to update Supabase
    console.log('updateLecturer called but not implemented for Supabase yet:', id, updates);
  };

  return (
    <RoomContext.Provider value={{ 
      studios, 
      namedRooms, 
      updateStudioName, 
      updateRoomName, 
      lecturers, 
      updateLecturer, 
      lecturersLoading: loading, 
      lecturersError: error,
      roomIdToPosition,
      rooms,
      loading,
      error
    }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomContext;
