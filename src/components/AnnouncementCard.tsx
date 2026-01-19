import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { format } from 'date-fns';
import type { Announcement } from '@/hooks/useAnnouncements';

interface AnnouncementCardProps {
  announcement: Announcement;
  isLatest: boolean;
}

const getYouTubeEmbedUrl = (url: string): string | null => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&?\s]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement, isLatest }) => {
  const isMobile = useIsMobile();
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 50, y: 50 });
  };

  const glowIntensity = isLatest ? 0.4 : 0.15;
  const glowColor = isLatest 
    ? `rgba(255, 215, 0, ${isHovered || isMobile ? glowIntensity : glowIntensity * 0.5})`
    : `rgba(255, 215, 0, ${isHovered || isMobile ? glowIntensity : 0})`;

  const youtubeEmbedUrl = announcement.youtube_url ? getYouTubeEmbedUrl(announcement.youtube_url) : null;
  const formattedDate = format(new Date(announcement.created_at), 'MMMM d, yyyy');

  return (
    <div
      className="relative rounded-xl border bg-card p-6 transition-all duration-300 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        boxShadow: isLatest || isHovered 
          ? `0 0 30px ${glowColor}, 0 0 60px ${glowColor}` 
          : undefined,
      }}
    >
      {/* Glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${glowColor} 0%, transparent 50%)`,
          opacity: isHovered || isMobile ? 1 : isLatest ? 0.5 : 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10 space-y-4">
        {/* Latest badge */}
        {isLatest && (
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
            Latest
          </span>
        )}

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-semibold">{announcement.title}</h3>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
          {announcement.description}
        </p>

        {/* Media: YouTube or Image */}
        {youtubeEmbedUrl && (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <iframe
              src={youtubeEmbedUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={announcement.title}
            />
          </div>
        )}

        {announcement.image_url && !youtubeEmbedUrl && (
          <div className="relative w-full rounded-lg overflow-hidden">
            <img
              src={announcement.image_url}
              alt={announcement.title}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        )}

        {/* Posted date */}
        <p className="text-sm text-muted-foreground pt-2 border-t">
          📅 Posted on {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default AnnouncementCard;
