import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAnnouncements, Announcement } from '@/hooks/useAnnouncements';
import { Trash2, Plus, Megaphone, Pencil, X } from 'lucide-react';
import { format } from 'date-fns';

const AnnouncementAdminPanel: React.FC = () => {
  const { announcements, addAnnouncement, deleteAnnouncement, updateAnnouncement, isAdding, isDeleting, isUpdating } = useAnnouncements();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImageUrl('');
    setYoutubeUrl('');
    setEditingAnnouncement(null);
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setTitle(announcement.title);
    setDescription(announcement.description);
    setImageUrl(announcement.image_url || '');
    setYoutubeUrl(announcement.youtube_url || '');
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      toast.error('Title and description are required');
      return;
    }

    try {
      if (editingAnnouncement) {
        await updateAnnouncement({
          id: editingAnnouncement.id,
          title: title.trim(),
          description: description.trim(),
          image_url: imageUrl.trim() || undefined,
          youtube_url: youtubeUrl.trim() || undefined,
        });
        toast.success('Announcement updated successfully');
      } else {
        await addAnnouncement({
          title: title.trim(),
          description: description.trim(),
          image_url: imageUrl.trim() || undefined,
          youtube_url: youtubeUrl.trim() || undefined,
        });
        toast.success('Announcement posted successfully');
      }
      resetForm();
    } catch (error) {
      toast.error(editingAnnouncement ? 'Failed to update announcement' : 'Failed to post announcement');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;
    
    try {
      await deleteAnnouncement(id);
      toast.success('Announcement deleted');
      if (editingAnnouncement?.id === id) {
        resetForm();
      }
    } catch (error) {
      toast.error('Failed to delete announcement');
      console.error(error);
    }
  };

  const isSubmitting = isAdding || isUpdating;

  return (
    <div className="space-y-6">
      {/* Add/Edit Announcement Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="w-5 h-5" />
            {editingAnnouncement ? 'Edit Announcement' : 'Post New Announcement'}
          </CardTitle>
          <CardDescription>
            {editingAnnouncement 
              ? 'Update the announcement details below'
              : 'Create a new announcement that will appear on the homepage'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter announcement title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter announcement details. You can include URLs and they will be clickable."
                rows={4}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL (optional)</Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="youtubeUrl">YouTube URL (optional)</Label>
              <Input
                id="youtubeUrl"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
              />
              <p className="text-xs text-muted-foreground">
                If both image and YouTube URL are provided, YouTube video will be shown at the bottom
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {editingAnnouncement ? (
                  <>
                    <Pencil className="w-4 h-4 mr-2" />
                    {isUpdating ? 'Updating...' : 'Update Announcement'}
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    {isAdding ? 'Posting...' : 'Post Announcement'}
                  </>
                )}
              </Button>
              {editingAnnouncement && (
                <Button type="button" variant="outline" onClick={handleCancelEdit}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Existing Announcements */}
      <Card>
        <CardHeader>
          <CardTitle>Existing Announcements</CardTitle>
          <CardDescription>
            {announcements.length} announcement{announcements.length !== 1 ? 's' : ''} posted
          </CardDescription>
        </CardHeader>
        <CardContent>
          {announcements.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No announcements yet. Create one above!
            </p>
          ) : (
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className={`flex items-start justify-between gap-4 p-4 border rounded-lg bg-muted/50 ${
                    editingAnnouncement?.id === announcement.id ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{announcement.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {announcement.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Posted on {format(new Date(announcement.created_at), 'MMM d, yyyy')}
                    </p>
                    {announcement.youtube_url && (
                      <span className="inline-block mt-1 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                        YouTube
                      </span>
                    )}
                    {announcement.image_url && !announcement.youtube_url && (
                      <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                        Image
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(announcement)}
                      disabled={isSubmitting}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(announcement.id)}
                      disabled={isDeleting}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementAdminPanel;
