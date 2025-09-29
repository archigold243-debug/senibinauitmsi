import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

const Students = () => {
  const degreeSegments = [
    {
      id: 1,
      title: 'Segment 1',
      description: 'Student work showcase',
      driveLink: 'https://drive.google.com/drive/folders/',
      thumbnail: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'Segment 2',
      description: 'Student work showcase',
      driveLink: 'https://drive.google.com/drive/folders/',
      thumbnail: '/placeholder.svg'
    },
    {
      id: 3,
      title: 'Segment 3',
      description: 'Student work showcase',
      driveLink: 'https://drive.google.com/drive/folders/',
      thumbnail: '/placeholder.svg'
    },
    {
      id: 4,
      title: 'Segment 4',
      description: 'Student work showcase',
      driveLink: 'https://drive.google.com/drive/folders/',
      thumbnail: '/placeholder.svg'
    },
    {
      id: 5,
      title: 'Segment 5',
      description: 'Student work showcase',
      driveLink: 'https://drive.google.com/drive/folders/',
      thumbnail: '/placeholder.svg'
    },
    {
      id: 6,
      title: 'Segment 6',
      description: 'Student work showcase',
      driveLink: 'https://drive.google.com/drive/folders/',
      thumbnail: '/placeholder.svg'
    },
    {
      id: 7,
      title: 'Segment 7',
      description: 'Student work showcase',
      driveLink: 'https://drive.google.com/drive/folders/',
      thumbnail: '/placeholder.svg'
    }
  ];

  const masterSegments = [
    {
      id: 1,
      title: 'Master Segment 1',
      description: 'Graduate student work',
      driveLink: 'https://drive.google.com/drive/folders/',
      thumbnail: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'Master Segment 2',
      description: 'Graduate student work',
      driveLink: 'https://drive.google.com/drive/folders/',
      thumbnail: '/placeholder.svg'
    },
    {
      id: 3,
      title: 'Master Segment 3',
      description: 'Graduate student work',
      driveLink: 'https://drive.google.com/drive/folders/',
      thumbnail: '/placeholder.svg'
    },
    {
      id: 4,
      title: 'Master Segment 4',
      description: 'Graduate student work',
      driveLink: 'https://drive.google.com/drive/folders/',
      thumbnail: '/placeholder.svg'
    }
  ];

  const SegmentCard = ({ segment }: { segment: any }) => (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300">
      <a href={segment.driveLink} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={segment.thumbnail}
            alt={segment.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          <div className="absolute top-3 right-3 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ExternalLink className="w-4 h-4 text-primary" />
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-lg">{segment.title}</CardTitle>
          <CardDescription>{segment.description}</CardDescription>
        </CardHeader>
      </a>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Student Work</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore the creative works and projects by our talented students across degree and master programs.
          </p>
        </div>

        {/* Degree Section */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Degree Programs</h2>
            <p className="text-muted-foreground">
              Discover the innovative projects and creative works from our undergraduate students.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {degreeSegments.map((segment) => (
              <SegmentCard key={segment.id} segment={segment} />
            ))}
          </div>
        </section>

        {/* Master Section */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Master Programs</h2>
            <p className="text-muted-foreground">
              Explore the advanced research and sophisticated works from our graduate students.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {masterSegments.map((segment) => (
              <SegmentCard key={segment.id} segment={segment} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Students;