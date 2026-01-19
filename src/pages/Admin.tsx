import React, { useState, useEffect } from 'react';
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
import LecturerAdminPanel from "./LecturerAdminPanel";
import StudioAdminPanel from "./StudioAdminPanel";
import NamedRoomAdminPanel from "./NamedRoomAdminPanel";
import AnnouncementAdminPanel from "./AnnouncementAdminPanel";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { studios, namedRooms, updateStudioName, updateRoomName, lecturers, updateLecturer } = useRoomContext();

  // Check localStorage for existing auth state on component mount
  useEffect(() => {
    const authState = localStorage.getItem('admin_authenticated');
    if (authState === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
      toast.success('Access granted');
    } else {
      toast.error('Invalid password');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
    toast.success('Logged out successfully');
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
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>

          <Tabs defaultValue="studios" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="studios">Studios</TabsTrigger>
              <TabsTrigger value="named-rooms">Named Rooms</TabsTrigger>
              <TabsTrigger value="lecturers">Lecturers</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="studios" className="space-y-4">
              <StudioAdminPanel />
            </TabsContent>

            <TabsContent value="named-rooms" className="space-y-4">
              <NamedRoomAdminPanel />
            </TabsContent>
            <TabsContent value="lecturers" className="space-y-4">
              <LecturerAdminPanel />
            </TabsContent>
            <TabsContent value="announcements" className="space-y-4">
              <AnnouncementAdminPanel />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
