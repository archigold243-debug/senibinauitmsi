import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface RoomData {
  id: string;
  currentName: string;
  description: string;
  floor: string;
  position: [number, number, number];
}

export interface LecturerData {
  id: string;
  displayName: string;
  surname: string;
  photo: string;
  floor: string;
  roomID: string;
}

interface RoomContextType {
  studios: RoomData[];
  namedRooms: RoomData[];
  updateStudioName: (id: string, newName: string) => void;
  updateRoomName: (id: string, newName: string) => void;
  lecturers: LecturerData[];
  updateLecturer: (id: string, updates: Partial<LecturerData>) => void;
  lecturersLoading: boolean;
  lecturersError: string | null;
  handleCardClick: (floor: string, roomID: string) => void;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const RoomProvider = ({ children }: { children: React.ReactNode }) => {
  const [studios, setStudios] = useState<RoomData[]>([]);
  const [namedRooms, setNamedRooms] = useState<RoomData[]>([]);
  const [lecturers, setLecturers] = useState<LecturerData[]>([]);
  const [lecturersLoading, setLecturersLoading] = useState<boolean>(true);
  const [lecturersError, setLecturersError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudios = async () => {
      const { data, error } = await supabase
        .from("studio_rooms")
        .select("*")
        .order("id");

      if (!error && data) {
        setStudios(data);
      }
    };

    const fetchNamedRooms = async () => {
      const { data, error } = await supabase
        .from("named_rooms")
        .select("*")
        .order("id");

      if (!error && data) {
        setNamedRooms(data);
      }
    };

    const fetchLecturers = async () => {
      setLecturersLoading(true);
      const { data, error } = await supabase
        .from("lecturers")
        .select("*")
        .order("id");

      if (error) {
        setLecturersError("Failed to load lecturers");
        console.error("Error loading lecturers:", error);
      } else {
        setLecturers(data);
        setLecturersError(null);
      }

      setLecturersLoading(false);
    };

    fetchStudios();
    fetchNamedRooms();
    fetchLecturers();
  }, []);

  const updateStudioName = (id: string, newName: string) => {
    setStudios((prev) =>
      prev.map((room) => (room.id === id ? { ...room, name: newName } : room))
    );
  };

  const updateRoomName = (id: string, newName: string) => {
    setNamedRooms((prev) =>
      prev.map((room) => (room.id === id ? { ...room, name: newName } : room))
    );
  };

  const updateLecturer = (id: string, updates: Partial<LecturerData>) => {
    setLecturers((prev) =>
      prev.map((lect) => (lect.id === id ? { ...lect, ...updates } : lect))
    );
  };

  const handleCardClick = (floor: string, roomID: string) => {
    const floorSlug = floor.toLowerCase().replace(/\s+/g, "-");
    window.location.href = `/${floorSlug}?room=${roomID}`;
  };

  return (
    <RoomContext.Provider
      value={{
        studios,
        namedRooms,
        updateStudioName,
        updateRoomName,
        lecturers,
        updateLecturer,
        lecturersLoading,
        lecturersError,
        handleCardClick,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = (): RoomContextType => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoomContext must be used within a RoomProvider");
  }
  return context;
};
