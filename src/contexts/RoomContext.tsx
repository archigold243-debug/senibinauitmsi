import React, { createContext, useContext, ReactNode, useEffect } from 'react';
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
  username: string;
  surname: string;
  photo_url: string;
  floor: string;
  roomID: string;
  expertise?: string | string[];
  title?: string;
}

interface RoomContextType {
  studios: RoomData[];
  namedRooms: RoomData[];
  updateStudioName: (id: string, newName: string) => Promise<void>;
  updateRoomName: (id: string, newName: string) => Promise<void>;
  lecturers: LecturerData[];
  updateLecturer: (id: string, updates: Partial<LecturerData>) => Promise<void>;
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
  username: user.username || '',
  surname: user.surname || '',
  photo_url: user.photo_url || '',
  floor: user.floor || '',
  roomID: user.roomID || '',
  expertise: user.expertise,
  title: user.title || '',
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

  // Debug: Log missing roomIDs for hotspots
  useEffect(() => {
    if (!roomIdToPosition) return;
    const allHotspotRoomIDs = [
      ...studios.map(r => r.id),
      ...namedRooms.map(r => r.id),
      ...lecturers.map(l => l.roomID)
    ].filter(Boolean);
    const missing = allHotspotRoomIDs.filter(id => !roomIdToPosition[id]);
    if (missing.length > 0) {
      console.warn('Missing room positions for these roomIDs:', missing);
    } else {
      console.log('All hotspot roomIDs have positions.');
    }
  }, [studios, namedRooms, lecturers, roomIdToPosition]);

  const updateStudioName = async (id: string, newName: string) => {
    await updateRoomNameInDB(id, newName);
  };

  const updateRoomName = async (id: string, newName: string) => {
    await updateRoomNameInDB(id, newName);
  };

  const updateLecturer = async (id: string, updates: Partial<LecturerData>) => {
    const { supabase } = await import('@/lib/supabaseClient');
    
    try {
      console.log('Updating lecturer with ID:', id);
      console.log('Updates:', updates);
      
      // Convert the ID to a number as the database column is int4
      const lecturerIdAsNumber = parseInt(id, 10);
      if (isNaN(lecturerIdAsNumber)) {
        throw new Error('Invalid lecturer ID. Expected a number.');
      }

      const { data, error } = await supabase
        .from('user_credentials')
        .update({
          username: updates.username,
          surname: updates.surname,
          photo_url: updates.photo_url,
          floor: updates.floor,
          roomID: updates.roomID,
        })
        .eq('id', lecturerIdAsNumber) // Use the parsed number ID here
        .select();

      if (error) {
        console.error('Supabase error details:', error);
        throw error;
      }
      
      console.log('Lecturer updated successfully:', id, updates);
      console.log('Updated data:', data);
    } catch (error) {
      console.error('Failed to update lecturer:', error);
      throw error;
    }
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
