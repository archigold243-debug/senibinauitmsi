import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export interface Room {
  roomID: string;
  room_name: string;
  description?: string;
  floor?: string;
  position?: [number, number, number];
  room_type?: string;
}

export interface UserCredential {
  id: string;
  room?: string; // links to rooms.roomID
  displayName?: string;
  surname?: string;
  photo?: string;
  expertise?: string | string[];
  roomID?: string; // for compatibility
}

export const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [lecturers, setLecturers] = useState<UserCredential[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoomsAndLecturers = async () => {
      try {
        // Fetch rooms from Supabase
        const { data: roomsData, error: roomsError } = await supabase
          .from('rooms')
          .select('*');

        if (roomsError) {
          throw roomsError;
        }

        // Fetch lecturers from user_credentials with proper field mapping
        const { data: lecturersData, error: lecturersError } = await supabase
          .from('user_credentials')
          .select('id, title, username, surname, photo_url, room, floor, lecturer_expertise:lecturer_expertise(expertise_id)');

        if (lecturersError) {
          throw lecturersError;
        }

        // Process rooms data - handle position as JSON string
        const processedRooms = roomsData?.map(room => ({
          ...room,
          position: room.position ? (typeof room.position === 'string' ? JSON.parse(room.position) : room.position) : undefined
        })) || [];

        // Process lecturers data and link with room IDs
        const processedLecturers = lecturersData?.map(lecturer => ({
          ...lecturer,
          displayName: `${lecturer.title ? lecturer.title + ' ' : ''}${lecturer.username}`.trim(),
          photo: lecturer.photo_url,
          roomID: lecturer.room, // Map room column to roomID for compatibility
          expertise: Array.isArray(lecturer.lecturer_expertise)
            ? lecturer.lecturer_expertise.map((ex: any) => ex.expertise_id)
            : [],
        })) || [];

        setRooms(processedRooms);
        setLecturers(processedLecturers);
        setError(null);
      } catch (err) {
        console.error('Error fetching rooms and lecturers:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchRoomsAndLecturers();
  }, []);

  const updateRoomName = async (roomID: string, newName: string) => {
    try {
      const { error } = await supabase
        .from('rooms')
        .update({ room_name: newName })
        .eq('roomID', roomID);

      if (error) throw error;

      // Update local state
      setRooms(prev => prev.map(room => 
        room.roomID === roomID ? { ...room, room_name: newName } : room
      ));
    } catch (err) {
      console.error('Error updating room name:', err);
      throw err;
    }
  };

  // Helper functions to get rooms by type
  const getStudioRooms = () => rooms.filter(room => 
    room.room_type?.toLowerCase().includes('studio') || 
    room.roomID?.toLowerCase().includes('studio')
  );

  const getNamedRooms = () => rooms.filter(room => 
    !room.room_type?.toLowerCase().includes('studio') && 
    !room.roomID?.toLowerCase().includes('studio')
  );

  // Create room position mapping
  const getRoomIdToPosition = () => {
    const mapping: Record<string, [number, number, number]> = {};
    rooms.forEach(room => {
      if (room.position && room.roomID) {
        mapping[room.roomID] = room.position;
      }
    });
    return mapping;
  };

  return {
    rooms,
    lecturers,
    loading,
    error,
    updateRoomName,
    getStudioRooms,
    getNamedRooms,
    getRoomIdToPosition,
    // For compatibility with existing code
    studios: getStudioRooms(),
    namedRooms: getNamedRooms(),
  };
};