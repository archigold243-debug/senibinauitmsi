
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useRoomContext } from '@/contexts/RoomContext';

const StudioAdminPanel: React.FC = () => {
  const { studios, updateStudioName } = useRoomContext();
  const [editingStudio, setEditingStudio] = useState<string | null>(null);
  const [newStudioName, setNewStudioName] = useState('');

  const handleStudioRename = async (studioId: string) => {
    if (!newStudioName.trim()) {
      toast.error('Please enter a valid name');
      return;
    }

    try {
      await updateStudioName(studioId, newStudioName.trim());
      toast.success('Studio renamed successfully');
      setEditingStudio(null);
      setNewStudioName('');
    } catch (error) {
      toast.error('Failed to rename studio');
      console.error('Error renaming studio:', error);
    }
  };

  const startEditingStudio = (studio: any) => {
    setEditingStudio(studio.id);
    setNewStudioName(studio.currentName);
  };

  const cancelEdit = () => {
    setEditingStudio(null);
    setNewStudioName('');
  };

  return (
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
  );
};

export default StudioAdminPanel;
