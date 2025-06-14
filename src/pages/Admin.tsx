import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRoomContext } from '@/contexts/RoomContext';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { studios, namedRooms, updateStudioName, updateRoomName } = useRoomContext();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      toast.success('Access granted');
    } else {
      toast.error('Invalid password');
      setPassword('');
    }
  };

  const [editingStudio, setEditingStudio] = useState<string | null>(null);
  const [editingRoom, setEditingRoom] = useState<string | null>(null);
  const [newStudioName, setNewStudioName] = useState('');
  const [newRoomName, setNewRoomName] = useState('');

  const handleStudioRename = (studioId: string) => {
    if (!newStudioName.trim()) {
      toast.error('Please enter a valid name');
      return;
    }

    updateStudioName(studioId, newStudioName.trim());
    toast.success('Studio renamed successfully');
    setEditingStudio(null);
    setNewStudioName('');
  };

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

  const startEditingStudio = (studio: any) => {
    setEditingStudio(studio.id);
    setNewStudioName(studio.currentName);
  };

  const startEditingRoom = (room: any) => {
    setEditingRoom(room.id);
    setNewRoomName(room.currentName);
  };

  const cancelEdit = () => {
    setEditingStudio(null);
    setEditingRoom(null);
    setNewStudioName('');
    setNewRoomName('');
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate('/')}
                    className="p-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground">Back</span>
                </div>
                <CardTitle className="text-center">Admin Access</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter admin password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-light mb-4">Admin Panel</h1>
              <p className="text-lg text-muted-foreground">
                Manage room and studio names across all floors of the building.
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setIsAuthenticated(false)}
            >
              Logout
            </Button>
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
