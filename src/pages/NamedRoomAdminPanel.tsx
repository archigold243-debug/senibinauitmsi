import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRoomContext } from "@/contexts/RoomContext";
import { toast } from "sonner";

const NamedRoomAdminPanel: React.FC = () => {
  const { namedRooms, updateRoomName } = useRoomContext();
  const [editingRoom, setEditingRoom] = useState<string | null>(null);
  const [newRoomName, setNewRoomName] = useState('');

  const handleRoomRename = (roomId: string) => {
    if (!newRoomName.trim()) {
      toast.error('Please enter a valid name');
      return;
    }

    updateRoomName(roomId, newRoomName.trim());
    toast.success('Room renamed successfully');
    setEditingRoom(null);
    setNewRoomName('');
  };

  const startEditingRoom = (room: any) => {
    setEditingRoom(room.id);
    setNewRoomName(room.currentName);
  };

  const cancelEdit = () => {
    setEditingRoom(null);
    setNewRoomName('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Named Rooms</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {namedRooms.map((room) =>
            editingRoom === room.id ? (
              <div
                key={room.id}
                className="p-4 border rounded-lg bg-muted/20 flex items-center justify-between"
              >
                <div className="flex-1 mr-4">
                  <Label htmlFor={`roomName-${room.id}`}>Room Name</Label>
                  <Input
                    id={`roomName-${room.id}`}
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                    placeholder="Enter room name"
                    className="mt-1"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleRoomRename(room.id)} size="sm">
                    Save
                  </Button>
                  <Button variant="outline" onClick={cancelEdit} size="sm">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div
                key={room.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <div className="font-semibold">{room.currentName}</div>
                  <div className="text-sm text-gray-500">
                    Floor: {room.floor} | ID: {room.id}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => startEditingRoom(room)}
                >
                  Edit
                </Button>
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NamedRoomAdminPanel;