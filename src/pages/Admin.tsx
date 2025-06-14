
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface RoomData {
  id: string;
  currentName: string;
  description: string;
  floor: string;
  position: [number, number, number];
}

const Admin = () => {
  // Sample data - in a real app this would come from a database
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

  const [editingStudio, setEditingStudio] = useState<string | null>(null);
  const [editingRoom, setEditingRoom] = useState<string | null>(null);
  const [newStudioName, setNewStudioName] = useState('');
  const [newRoomName, setNewRoomName] = useState('');

  const handleStudioRename = (studioId: string) => {
    if (!newStudioName.trim()) {
      toast.error('Please enter a valid name');
      return;
    }

    setStudios(prev => prev.map(studio => 
      studio.id === studioId 
        ? { ...studio, currentName: newStudioName.trim() }
        : studio
    ));
    
    toast.success('Studio renamed successfully');
    setEditingStudio(null);
    setNewStudioName('');
  };

  const handleRoomRename = (roomId: string) => {
    if (!newRoomName.trim()) {
      toast.error('Please enter a valid name');
      return;
    }

    setNamedRooms(prev => prev.map(room => 
      room.id === roomId 
        ? { ...room, currentName: newRoomName.trim() }
        : room
    ));
    
    toast.success('Room renamed successfully');
    setEditingRoom(null);
    setNewRoomName('');
  };

  const startEditingStudio = (studio: RoomData) => {
    setEditingStudio(studio.id);
    setNewStudioName(studio.currentName);
  };

  const startEditingRoom = (room: RoomData) => {
    setEditingRoom(room.id);
    setNewRoomName(room.currentName);
  };

  const cancelEdit = () => {
    setEditingStudio(null);
    setEditingRoom(null);
    setNewStudioName('');
    setNewRoomName('');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-light mb-4">Admin Panel</h1>
            <p className="text-lg text-muted-foreground">
              Manage room and studio names across all floors of the building.
            </p>
          </div>

          <Tabs defaultValue="studios" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="studios">Studios</TabsTrigger>
              <TabsTrigger value="named-rooms">Named Rooms</TabsTrigger>
            </TabsList>
            
            <TabsContent value="studios" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Studio Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {studios.map((studio) => (
                      <div key={studio.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-4">
                            {editingStudio === studio.id ? (
                              <div className="flex items-center gap-2 flex-1">
                                <Label htmlFor={`studio-${studio.id}`} className="sr-only">
                                  Studio Name
                                </Label>
                                <Input
                                  id={`studio-${studio.id}`}
                                  value={newStudioName}
                                  onChange={(e) => setNewStudioName(e.target.value)}
                                  className="flex-1"
                                  placeholder="Enter new studio name"
                                />
                                <Button 
                                  onClick={() => handleStudioRename(studio.id)}
                                  size="sm"
                                >
                                  Save
                                </Button>
                                <Button 
                                  onClick={cancelEdit}
                                  variant="outline"
                                  size="sm"
                                >
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <>
                                <div className="flex-1">
                                  <h3 className="font-medium">{studio.currentName}</h3>
                                  <p className="text-sm text-gray-600">{studio.description}</p>
                                  <p className="text-xs text-gray-500">{studio.floor}</p>
                                </div>
                                <Button 
                                  onClick={() => startEditingStudio(studio)}
                                  variant="outline"
                                  size="sm"
                                >
                                  Rename
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="named-rooms" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Named Rooms Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {namedRooms.map((room) => (
                      <div key={room.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-4">
                            {editingRoom === room.id ? (
                              <div className="flex items-center gap-2 flex-1">
                                <Label htmlFor={`room-${room.id}`} className="sr-only">
                                  Room Name
                                </Label>
                                <Input
                                  id={`room-${room.id}`}
                                  value={newRoomName}
                                  onChange={(e) => setNewRoomName(e.target.value)}
                                  className="flex-1"
                                  placeholder="Enter new room name"
                                />
                                <Button 
                                  onClick={() => handleRoomRename(room.id)}
                                  size="sm"
                                >
                                  Save
                                </Button>
                                <Button 
                                  onClick={cancelEdit}
                                  variant="outline"
                                  size="sm"
                                >
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <>
                                <div className="flex-1">
                                  <h3 className="font-medium">{room.currentName}</h3>
                                  <p className="text-sm text-gray-600">{room.description}</p>
                                  <p className="text-xs text-gray-500">{room.floor}</p>
                                </div>
                                <Button 
                                  onClick={() => startEditingRoom(room)}
                                  variant="outline"
                                  size="sm"
                                >
                                  Rename
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
