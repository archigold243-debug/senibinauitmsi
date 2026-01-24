import React, { useState } from 'react';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import AnnouncementCard from './AnnouncementCard';
import { Megaphone, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const AnnouncementsSection: React.FC = () => {
  const { announcements, isLoading, error } = useAnnouncements();
  const [isPastOpen, setIsPastOpen] = useState(false);

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

  const recentAnnouncements = announcements.slice(0, 3);
  const pastAnnouncements = announcements.slice(3);

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center gap-2">
          <Megaphone className="w-6 h-6" />
          Announcements
        </h2>
        
        {/* Recent Announcements (always visible) */}
        <div className="space-y-6">
          {recentAnnouncements.map((announcement, index) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              isLatest={index === 0}
            />
          ))}
        </div>

        {/* Past Announcements (collapsible) */}
        {pastAnnouncements.length > 0 && (
          <Collapsible open={isPastOpen} onOpenChange={setIsPastOpen} className="mt-6">
            <CollapsibleTrigger className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-full justify-center py-3 border rounded-lg hover:bg-muted/50">
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isPastOpen ? 'rotate-180' : ''}`} />
              <span>Past Announcements ({pastAnnouncements.length})</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-6 mt-4">
              {pastAnnouncements.map((announcement) => (
                <AnnouncementCard
                  key={announcement.id}
                  announcement={announcement}
                  isLatest={false}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>
    </section>
  );
};

export default AnnouncementsSection;
