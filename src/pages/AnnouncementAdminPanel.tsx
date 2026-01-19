import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import { Trash2, Plus, Megaphone } from 'lucide-react';
import { format } from 'date-fns';

const AnnouncementAdminPanel: React.FC = () => {
  const { announcements, addAnnouncement, deleteAnnouncement, isAdding, isDeleting } = useAnnouncements();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      toast.error('Title and description are required');
      return;
    }

    try {
      await addAnnouncement({
        title: title.trim(),
        description: description.trim(),
        image_url: imageUrl.trim() || undefined,
        youtube_url: youtubeUrl.trim() || undefined,
      });
      
      toast.success('Announcement posted successfully');
      setTitle('');
      setDescription('');
      setImageUrl('');
      setYoutubeUrl('');
    } catch (error) {
      toast.error('Failed to post announcement');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;
    
    try {
      await deleteAnnouncement(id);
      toast.success('Announcement deleted');
    } catch (error) {
      toast.error('Failed to delete announcement');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Announcement Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="w-5 h-5" />
            Post New Announcement
          </CardTitle>
          <CardDescription>
            Create a new announcement that will appear on the homepage
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
                placeholder="Enter announcement details"
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
                If both image and YouTube URL are provided, YouTube video will be shown
              </p>
            </div>
            
            <Button type="submit" disabled={isAdding} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              {isAdding ? 'Posting...' : 'Post Announcement'}
            </Button>
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
                  className="flex items-start justify-between gap-4 p-4 border rounded-lg bg-muted/50"
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
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(announcement.id)}
                    disabled={isDeleting}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
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
