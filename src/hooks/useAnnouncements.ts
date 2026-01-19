import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

export interface Announcement {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  youtube_url: string | null;
  created_at: string;
}

export const useAnnouncements = () => {
  const queryClient = useQueryClient();

  const { data: announcements = [], isLoading, error } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Announcement Web')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Announcement[];
    },
  });

  const addAnnouncementMutation = useMutation({
    mutationFn: async (announcement: {
      title: string;
      description: string;
      image_url?: string;
      youtube_url?: string;
    }) => {
      const { data, error } = await supabase
        .from('Announcement Web')
        .insert([{
          title: announcement.title,
          description: announcement.description,
          image_url: announcement.image_url || null,
          youtube_url: announcement.youtube_url || null,
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });

  const deleteAnnouncementMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('Announcement Web')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });

  return {
    announcements,
    isLoading,
    error,
    addAnnouncement: addAnnouncementMutation.mutateAsync,
    deleteAnnouncement: deleteAnnouncementMutation.mutateAsync,
    isAdding: addAnnouncementMutation.isPending,
    isDeleting: deleteAnnouncementMutation.isPending,
  };
};
