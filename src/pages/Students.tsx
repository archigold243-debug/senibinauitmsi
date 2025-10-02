import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Students = () => {
  const degreeSegments = [
    {
      id: 1,
      title: 'Semester 01',
      description: 'AAA400 & AAA405',
      driveLink: 'https://drive.google.com/drive/folders/1S5exR_0hP4H7ZJBj0BzAnD7F711tNsHb?usp=drive_link',
      thumbnail: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'Semester 02',
      description: 'Design AAA450',
      driveLink: 'https://drive.google.com/drive/folders/1VOvWmrZ5xM28IlyQVV7jQ5hq23LDM10G?usp=drive_link',
      thumbnail: 'https://drive.google.com/uc?id=15F0UjmKxeoK4Jb0Dk0Vt6sKd-wCt0x_0'
    },
    {
      id: 3,
      title: 'Semester 03',
      description: 'AAA500',
      driveLink: 'https://drive.google.com/drive/folders/1BokjqPxqvGct4eT4VIX1Fjmo5kCFm7iR?usp=drive_link',
      thumbnail: '/placeholder.svg'
    },
    {
      id: 4,
      title: 'Semester 04',
      description: 'AAA550',
      driveLink: 'https://drive.google.com/drive/folders/1oGmyG-hjiUjl3Cjz65IGfacIo3nzfPON?usp=drive_link',
      thumbnail: '/placeholder.svg'
    },
    {
      id: 5,
      title: 'Semester 05',
      description: 'AAA600',
      driveLink: 'https://drive.google.com/drive/folders/1BPQKHE9h3ykHdQDMSreXH6Y0BrhO3RAV?usp=drive_link',
      thumbnail: '/placeholder.svg'
    },
    {
      id: 6,
      title: 'Semester 07',
      description: 'AAA650',
      driveLink: 'https://drive.google.com/drive/folders/1KZ-Df7Mmi7Ja_WWXeBBfFTagN1cXKM6L?usp=drive_link',
      thumbnail: '/placeholder.svg'
    },
    {
      id: 7,
      title: 'Semester 08',
      description: 'Student work showcase',
      driveLink: 'https://drive.google.com/drive/folders/1SMXxhXnSuBJU8nRbycO20AljvqDw_3Sw?usp=drive_link',
      thumbnail: '/Screenshot 2025-09-29 155028.png'
    }
  ];

  const masterSegments = [
    {
      id: 1,
      title: 'Master Semester 01',
      description: 'Graduate student work',
      driveLink: 'https://drive.google.com/drive/folders/16ep05Ts5vAEYIUKPJDyQxDdZnjILsCdT?usp=drive_link',
      thumbnail: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'Master Semester 02',
      description: 'Graduate student work',
      driveLink: 'https://drive.google.com/drive/folders/15fgQETU1tlza6AvltP3EI0WK65AmGKSl?usp=drive_link',
      thumbnail: '/placeholder.svg'
    },
    {
      id: 3,
      title: 'Master Semester 03',
      description: 'Graduate student work',
      driveLink: 'https://drive.google.com/drive/folders/1-gjCsY88dLrgHwjwP0usBk2KDe21JgkN?usp=drive_link',
      thumbnail: '/placeholder.svg'
    },
    {
      id: 4,
      title: 'Master Semester 04',
      description: 'Graduate student work',
      driveLink: 'https://drive.google.com/drive/folders/1xk9EAokPmCwVJt8GLWDjiemLNw2N5R2F?usp=drive_link',
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
        <Navigation />
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Student Work</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore the creative works and projects by our talented students across degree and master programs.
          </p>
        </div>

        {/* QR Invite Section */}
        <div className="flex flex-col items-center justify-center mb-12">
          <img
            src="/qr-academic-advisor.png"
            alt="Scan to search Academic Advisor"
            className="w-40 h-40 object-contain mb-4 border rounded-lg shadow"
          />
          <div className="text-lg font-medium text-center text-muted-foreground">
            Scan this QR code to search for your Academic Advisor
          </div>
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
