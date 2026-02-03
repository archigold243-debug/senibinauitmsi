import React, { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { format } from 'date-fns';
import { ExternalLink } from 'lucide-react';
import type { Announcement } from '@/hooks/useAnnouncements';

interface AnnouncementCardProps {
  announcement: Announcement;
  isLatest: boolean;
}

const getYouTubeEmbedUrl = (url: string): string | null => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&?\s]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

const isTikTokUrl = (url?: string | null) => {
  if (!url) return false;
  return /tiktok\.com/.test(url) || /vm\.tiktok\.com/.test(url);
};

const extractTikTokId = (url: string): string | null => {
  // Match long form: https://www.tiktok.com/@user/video/1234567890
  const m = url.match(/tiktok\.com\/.+?\/video\/(\d+)/);
  if (m) return m[1];
  // Match short vm.tiktok.com links - can't extract id reliably; return null
  return null;
};

const renderDescriptionWithLinks = (text: string) => {
  // First handle markdown-style links [text](url)
  const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const rawUrlRegex = /(https?:\/\/[^\s]+)/g;
  
  // Replace markdown links with placeholders
  const tempText = text.replace(markdownLinkRegex, (_, linkText, url) => {
    return `%%MDLINK%%${linkText}%%URL%%${url}%%ENDLINK%%`;
  });
  
  // Split and process both markdown placeholders and raw URLs
  const parts = tempText.split(/(%%MDLINK%%.*?%%ENDLINK%%|https?:\/\/[^\s]+)/g);
  
  return parts.map((part, index) => {
    // Check if it's a markdown link placeholder
    const mdMatch = part.match(/%%MDLINK%%(.+?)%%URL%%(https?:\/\/[^\s]+)%%ENDLINK%%/);
    if (mdMatch) {
      return (
        <a
          key={index}
          href={mdMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline hover:text-primary/80 transition-colors"
        >
          {mdMatch[1]}
        </a>
      );
    }
    // Check if it's a raw URL
    if (part.match(rawUrlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline hover:text-primary/80 transition-colors"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement, isLatest }) => {
  const isMobile = useIsMobile();
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const mediaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mediaUrl = announcement.instagram_url;
    if (!mediaUrl) return;

    // If it's Instagram, inject blockquote markup and load Instagram embed script
    if (!isTikTokUrl(mediaUrl)) {
      const container = mediaRef.current;
      if (!container) return;
      container.innerHTML = `<blockquote class="instagram-media" data-instgrm-permalink="${mediaUrl}" data-instgrm-version="14"></blockquote>`;

      const scriptSrc = 'https://www.instagram.com/embed.js';
      const existing = document.querySelector(`script[src="${scriptSrc}"]`);
      if (!existing) {
        const s = document.createElement('script');
        s.src = scriptSrc;
        s.async = true;
        s.defer = true;
        document.body.appendChild(s);
        s.addEventListener('load', () => {
          try { (window as any).instgrm?.Embeds?.process?.(); } catch (e) { /* ignore */ }
        });
      } else {
        try { (window as any).instgrm?.Embeds?.process?.(); } catch (e) { /* ignore */ }
      }
    }
    // If it's TikTok we render via iframe in JSX (no DOM injection here)
  }, [announcement.instagram_url]);

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

        {/* Image - NOW ABOVE DESCRIPTION (only shown if no YouTube) */}
        {announcement.instagram_url && !youtubeEmbedUrl ? (
          isTikTokUrl(announcement.instagram_url) ? (
            // TikTok embed via iframe when video id can be extracted; otherwise fall back to image_url
            (() => {
              const id = extractTikTokId(announcement.instagram_url!);
              if (id) {
                return (
                  <div className="relative w-full rounded-lg overflow-hidden">
                    <iframe
                      title={`tiktok-${id}`}
                      src={`https://www.tiktok.com/embed/v2/${id}`}
                      className="w-full h-[580px] border-0"
                      allowFullScreen
                    />
                  </div>
                );
              }
              // fallback: if we have image_url, show it; otherwise show a link preview
              return announcement.image_url ? (
                <div className="relative w-full rounded-lg overflow-hidden">
                  <img
                    src={announcement.image_url}
                    alt={announcement.title}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">View on TikTok: <a href={announcement.instagram_url} target="_blank" rel="noreferrer" className="text-primary underline">open post</a></div>
              );
            })()
          ) : (
            <div className="relative w-full rounded-lg overflow-hidden flex justify-center">
              <div ref={mediaRef} className="instagram-embed" data-permalink={announcement.instagram_url} />
            </div>
          )
        ) : announcement.image_url && !youtubeEmbedUrl ? (
          <div className="relative w-full rounded-lg overflow-hidden">
            <img
              src={announcement.image_url}
              alt={announcement.title}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        ) : null}

        {/* Description with clickable links */}
        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
          {renderDescriptionWithLinks(announcement.description)}
        </p>

        {/* YouTube - STAYS AT BOTTOM */}
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

        {/* Posted date */}
        <p className="text-sm text-muted-foreground pt-2 border-t">
          📅 Posted on {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default AnnouncementCard;
