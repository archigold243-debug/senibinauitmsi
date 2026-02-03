import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAnnouncements, Announcement } from '@/hooks/useAnnouncements';
import { Trash2, Plus, Megaphone, Pencil, X } from 'lucide-react';
import { format } from 'date-fns';

interface AnnouncementAdminPanelProps {
  role?: 'admin' | 'archisa';
}

const AnnouncementAdminPanel: React.FC<AnnouncementAdminPanelProps> = ({ role = 'admin' }) => {
  const { announcements, addAnnouncement, deleteAnnouncement, updateAnnouncement, isAdding, isDeleting, isUpdating } = useAnnouncements();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [audience, setAudience] = useState<string[]>(role === 'archisa' ? ['students'] : []);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

  // Filter announcements based on role
  const filteredAnnouncements = role === 'archisa'
    ? announcements.filter(a => a.posted_by === 'archisa')
    : announcements;

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImageUrl('');
    setYoutubeUrl('');
    setInstagramUrl('');
    setAudience(role === 'archisa' ? ['students'] : []);
    setEditingAnnouncement(null);
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setTitle(announcement.title);
    setDescription(announcement.description);
    setImageUrl(announcement.image_url || '');
    setYoutubeUrl(announcement.youtube_url || '');
    setInstagramUrl(announcement.instagram_url || '');
    setAudience(role === 'archisa' ? ['students'] : (announcement.audience ?? []));
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

    // Determine the audience based on role
    const finalAudience = role === 'archisa' ? ['students'] : (audience.length > 0 ? audience : undefined);

    try {
      if (editingAnnouncement) {
        await updateAnnouncement({
          id: editingAnnouncement.id,
          title: title.trim(),
          description: description.trim(),
          image_url: imageUrl.trim() || undefined,
          youtube_url: youtubeUrl.trim() || undefined,
          instagram_url: instagramUrl.trim() || undefined,
          audience: finalAudience,
          posted_by: role,
        });
        toast.success('Announcement updated successfully');
      } else {
        await addAnnouncement({
          title: title.trim(),
          description: description.trim(),
          image_url: imageUrl.trim() || undefined,
          youtube_url: youtubeUrl.trim() || undefined,
          instagram_url: instagramUrl.trim() || undefined,
          audience: finalAudience,
          posted_by: role,
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
              : role === 'archisa'
                ? 'Create a new announcement for students'
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
                placeholder="Enter announcement details.

For links:
• Raw URL: https://example.com
• Custom text: [click here](https://example.com)"
                rows={5}
                required
              />
              <p className="text-xs text-muted-foreground">
                💡 Tip: Use [your text](https://url.com) to create links with custom text
              </p>
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

            <div className="space-y-2">
              <Label htmlFor="instagramUrl">Media Post URL (Instagram or TikTok) (optional)</Label>
              <Input
                id="instagramUrl"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                placeholder="https://www.instagram.com/p/POST_ID/ or https://www.tiktok.com/@user/video/VIDEO_ID"
              />
              <p className="text-xs text-muted-foreground">
                Optional link to a public Instagram or TikTok post. If provided, the announcement will embed the post inline when possible.
              </p>
            </div>

            {/* Only show audience selection for admin role */}
            {role === 'admin' && (
              <div className="space-y-2">
                <Label>Target Audience</Label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={audience.includes('students')}
                      onCheckedChange={(val) => {
                        const checked = !!val;
                        setAudience((prev) => {
                          if (checked) return Array.from(new Set([...prev, 'students']));
                          return prev.filter((p) => p !== 'students');
                        });
                      }}
                    />
                    <span>Students</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={audience.includes('public')}
                      onCheckedChange={(val) => {
                        const checked = !!val;
                        setAudience((prev) => {
                          if (checked) return Array.from(new Set([...prev, 'public']));
                          return prev.filter((p) => p !== 'public');
                        });
                      }}
                    />
                    <span>Public</span>
                  </label>
                </div>
                <p className="text-xs text-muted-foreground">If none selected, announcement will default to public (homepage).</p>
              </div>
            )}

            {/* Show info for archisa role */}
            {role === 'archisa' && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  📢 Your announcements will be visible on the <strong>Students</strong> page.
                </p>
              </div>
            )}
            
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
          <CardTitle>
            {role === 'archisa' ? 'Your Announcements' : 'Existing Announcements'}
          </CardTitle>
          <CardDescription>
            {filteredAnnouncements.length} announcement{filteredAnnouncements.length !== 1 ? 's' : ''} {role === 'archisa' ? 'posted by you' : 'posted'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredAnnouncements.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              {role === 'archisa' 
                ? 'You haven\'t posted any announcements yet. Create one above!'
                : 'No announcements yet. Create one above!'}
            </p>
          ) : (
            <div className="space-y-4">
              {filteredAnnouncements.map((announcement) => (
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
                    <div className="mt-2 flex gap-2 flex-wrap">
                      {(!announcement.audience || announcement.audience.length === 0) && (
                        <span className="inline-block text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Public</span>
                      )}
                      {announcement.audience?.includes('public') && (
                        <span className="inline-block text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Public</span>
                      )}
                      {announcement.audience?.includes('students') && (
                        <span className="inline-block text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Students</span>
                      )}
                      {announcement.posted_by && (
                        <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          By: {announcement.posted_by}
                        </span>
                      )}
                    </div>
                    {announcement.instagram_url && (
                      <span className="inline-block mt-1 text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded">Instagram</span>
                    )}
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
