import React from 'react';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import AnnouncementCard from './AnnouncementCard';
import { Megaphone } from 'lucide-react';

const AnnouncementsSection: React.FC = () => {
  const { announcements, isLoading, error } = useAnnouncements();

  if (isLoading) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center gap-2">
            <Megaphone className="w-6 h-6" />
            Announcements
          </h2>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse bg-muted rounded-xl h-48" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return null;
  }

  if (announcements.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center gap-2">
          <Megaphone className="w-6 h-6" />
          Announcements
        </h2>
        <div className="space-y-6">
          {announcements.map((announcement, index) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              isLatest={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnnouncementsSection;
