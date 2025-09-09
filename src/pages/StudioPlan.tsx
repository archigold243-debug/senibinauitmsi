import React from "react";
import Layout from "@/components/Layout";
import { useRoomContext } from "@/contexts/RoomContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
// import your Supabase client if you want direct API fetching
// import { supabase } from "@/lib/supabaseClient";

const StudioPlan = () => {
  const { studios, namedRooms, lecturers } = useRoomContext();

  // Combine all rooms and group by floor
  const allRooms = [...studios, ...namedRooms];
  const roomsByFloor = allRooms.reduce((acc, room) => {
    const floor = room.floor || "Unassigned";
    if (!acc[floor]) acc[floor] = [];
    acc[floor].push(room);
    return acc;
  }, {} as Record<string, typeof allRooms>);

  // Get lecturers for a specific room
  const getLecturersForRoom = (roomId: string) => {
    return lecturers.filter((lecturer) => lecturer.roomID === roomId);
  };

  // Get room type based on room name/type
  const getRoomType = (room: any) => {
    const name =
      room.currentName?.toLowerCase() || room.roomID?.toLowerCase() || "";
    if (name.includes("studio")) return "Studio";
    if (name.includes("office") || name.includes("pejabat")) return "Office";
    if (
      name.includes("classroom") ||
      name.includes("bilik") ||
      name.includes("kelas")
    )
      return "Classroom";
    if (name.includes("lab")) return "Lab";
    if (name.includes("crit")) return "Crit Room";
    if (name.includes("surau")) return "Prayer Room";
    if (name.includes("lounge")) return "Lounge";
    return "Room";
  };

  // Get color variant for room type
  const getRoomTypeColor = (type: string) => {
    switch (type) {
      case "Studio":
        return "bg-blue-100 text-blue-800";
      case "Office":
        return "bg-green-100 text-green-800";
      case "Classroom":
        return "bg-yellow-100 text-yellow-800";
      case "Lab":
        return "bg-purple-100 text-purple-800";
      case "Crit Room":
        return "bg-red-100 text-red-800";
      case "Prayer Room":
        return "bg-indigo-100 text-indigo-800";
      case "Lounge":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Order floors logically
  const floorOrder = [
    "Ground Floor",
    "1st Floor",
    "2nd Floor",
    "3rd Floor",
    "4th Floor",
  ];
  const orderedFloors = floorOrder.filter((floor) => roomsByFloor[floor]);

  // --- Coordinates for clickable overlays (example placeholders, adjust per room) ---
  const roomCoordinates: Record<string, any> = {
    "05C": { top: "5%", left: "70%", width: "80px", height: "40px" },
    "05A": { top: "25%", left: "60%", width: "70px", height: "35px" },
    "05B": { top: "25%", left: "45%", width: "70px", height: "35px" },
    "02A": { top: "40%", left: "55%", width: "70px", height: "30px" },
    // ...continue mapping for all rooms
  };

  // --- Optional: handle click to fetch from backend ---
  const handleRoomClick = async (roomId: string) => {
    console.log("Clicked room:", roomId);
    // Example fetching if you want modal integration later:
    // const { data, error } = await supabase
    //   .from("rooms")
    //   .select("*")
    //   .eq("id", roomId)
    //   .single();
    // if (!error && data) {
    //   console.log("Room data:", data);
    // }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light tracking-tight mb-4">
            Architecture Studio Plan
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive overview of all rooms, studios, and lecturer
            assignments across Annex 1
          </p>
        </div>

        {/* Room Type Legend */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Room Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[
                "Studio",
                "Office",
                "Classroom",
                "Lab",
                "Crit Room",
                "Prayer Room",
                "Lounge",
                "Room",
              ].map((type) => (
                <Badge key={type} className={getRoomTypeColor(type)}>
                  {type}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Floor-by-Floor Breakdown */}
        <div className="space-y-8">
          {orderedFloors.map((floorName) => {
            const floorRooms = roomsByFloor[floorName] || [];
            const totalRooms = floorRooms.length;
            const totalLecturers = floorRooms.reduce(
              (acc, room) => acc + getLecturersForRoom(room.id).length,
              0
            );

            return (
              <Card key={floorName} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-light">
                      {floorName}
                    </CardTitle>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>{totalRooms} Rooms</span>
                      <span>{totalLecturers} Lecturers</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {floorRooms.map((room) => {
                      const roomType = getRoomType(room);
                      const roomLecturers = getLecturersForRoom(room.id);

                      return (
                        <div
                          key={room.id}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm mb-1">
                                {room.currentName || room.id}
                              </h4>
                              <p className="text-xs text-muted-foreground mb-2">
                                Room ID: {room.id}
                              </p>
                            </div>
                            <Badge
                              className={`text-xs ${getRoomTypeColor(roomType)}`}
                            >
                              {roomType}
                            </Badge>
                          </div>

                          {room.description && (
                            <p className="text-xs text-muted-foreground mb-3">
                              {room.description}
                            </p>
                          )}

                          {roomLecturers.length > 0 && (
                            <>
                              <Separator className="my-3" />
                              <div>
                                <h5 className="text-xs font-medium mb-2 text-primary">
                                  Assigned Lecturers ({roomLecturers.length})
                                </h5>
                                <div className="space-y-2">
                                  {roomLecturers.map((lecturer) => (
                                    <div
                                      key={lecturer.id}
                                      className="flex items-center gap-2"
                                    >
                                      {lecturer.photo_url && (
                                        <img
                                          src={lecturer.photo_url}
                                          alt={`${lecturer.username} ${lecturer.surname}`}
                                          className="w-6 h-6 rounded-full object-cover"
                                        />
                                      )}
                                      <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium truncate">
                                          {lecturer.title
                                            ? `${lecturer.title} `
                                            : ""}
                                          {lecturer.username} {lecturer.surname}
                                        </p>
                                        {lecturer.expertise &&
                                          lecturer.expertise.length > 0 && (
                                            <p className="text-xs text-muted-foreground truncate">
                                              {Array.isArray(lecturer.expertise)
                                                ? lecturer.expertise.join(", ")
                                                : lecturer.expertise}
                                            </p>
                                          )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </>
                          )}

                          {roomLecturers.length === 0 && (
                            <p className="text-xs text-muted-foreground italic">
                              No assigned lecturers
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Summary Stats */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Building Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {allRooms.length}
                </div>
                <div className="text-sm text-muted-foreground">Total Rooms</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {lecturers.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Lecturers
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {studios.length}
                </div>
                <div className="text-sm text-muted-foreground">Studios</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {orderedFloors.length}
                </div>
                <div className="text-sm text-muted-foreground">Floors</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* --- Hardcoded Floor Plan Image with clickable overlays --- */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-light mb-4">Studio Plan Overview</h2>
          <div className="relative inline-block">
            <img
              src="/images/studio-plan.png"
              alt="Architecture Studio Plan"
              className="max-w-full h-auto rounded-lg shadow-md"
            />

            {allRooms.map((room) => {
              const coords = roomCoordinates[room.id];
              if (!coords) return null;
              return (
                <div
                  key={room.id}
                  onClick={() => handleRoomClick(room.id)}
                  className="absolute cursor-pointer bg-transparent hover:bg-primary/30"
                  style={coords}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudioPlan;
