import React, { useState, useEffect, useRef } from 'react';
import { useRoomContext, LecturerData } from '@/contexts/RoomContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/lib/supabaseClient';
import ExpertiseFilter from '@/components/ExpertiseFilter';
import Layout from '@/components/Layout';
import { Mail, MapPin, Building, X } from 'lucide-react';

const Lecturers: React.FC = () => {
  const navigate = useNavigate();
  const { lecturers, lecturersLoading, lecturersError } = useRoomContext();
  const [selectedExpertise, setSelectedExpertise] = useState('');
  const [filteredLecturers, setFilteredLecturers] = useState(lecturers);
  const [selectedLecturer, setSelectedLecturer] = useState<LecturerData | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedExpertise) {
      setFilteredLecturers(lecturers);
    } else {
      setFilteredLecturers(
        lecturers.filter(lect => {
          let expertise = lect.expertise || [];
          if (typeof expertise === 'string') {
            expertise = expertise.split(',').map(e => e.trim());
          }
          return Array.isArray(expertise) && expertise.map(String).includes(selectedExpertise);
        })
      );
    }
  }, [selectedExpertise, lecturers]);

  const [search, setSearch] = useState('');
  const [results, setResults] = useState<{ "Student Name": string; "Batch Name": string; "Intake": string  }[]>([]);
  const [loading, setLoading] = useState(false);

  const getFloorRoute = (floor: string) => {
    const normalized = floor.toLowerCase().replace(/\s+/g, '-');
    switch (normalized) {
      case 'ground-floor': return '/ground-floor';
      case 'first-floor': return '/first-floor';
      case 'second-floor': return '/second-floor';
      case 'third-floor': return '/third-floor';
      case 'fourth-floor': return '/fourth-floor';
      default: return '/';
    }
  };

  const handleLecturerClick = (lect: LecturerData) => {
    setSelectedLecturer(lect);
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleCloseDetail = () => {
    setSelectedLecturer(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const parseExpertise = (expertise: string | string[] | undefined): string[] => {
    if (!expertise) return [];
    if (Array.isArray(expertise)) return expertise;
    return expertise.split(',').map(e => e.trim()).filter(Boolean);
  };

  if (lecturersLoading) return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
              <Skeleton className="w-24 h-32 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-8 w-24 mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (lecturersError) return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto text-red-500 p-4 bg-red-50 rounded-lg">
        Error loading lecturers: {lecturersError}
      </div>
    </div>
  );

  if (!lecturers.length) return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto text-gray-500 p-4 bg-gray-50 rounded-lg">
        No lecturers found.
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-light mb-2">Lecturers Room Directory</h1>
            <p className="text-lg text-muted-foreground">
              Click on a lecturer to view their details and expertise.
            </p>
            <ExpertiseFilter onChange={setSelectedExpertise} />
          </div>

          {/* Lecturers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...filteredLecturers]
              .sort((a, b) => {
                const [titleA,...nameA] = (a.username || '').split(' ');
                const [titleB,...nameB] = (b.username || '').split(' ');
                const titleCompare = titleA.localeCompare(titleB);
                if (titleCompare !== 0) return titleCompare;
                return nameA.join(' ').localeCompare(nameB.join(' '));
              })
              .map((lect, idx) => (
              <div
                key={lect.id}
                onClick={() => handleLecturerClick(lect)}
                className={`bg-white rounded-xl shadow p-4 flex items-center gap-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedLecturer?.id === lect.id ? 'ring-2 ring-primary shadow-lg' : ''
                }`}
              >
                <div className="w-24 h-32 flex-shrink-0">
                  <img
                    src={lect.photo_url?.startsWith('http') ? lect.photo_url : `/${lect.photo_url}`}
                    alt={lect.username}
                    className="w-full h-full object-cover rounded-lg border border-muted"
                    loading={idx < 4 ? 'eager' : 'lazy'}
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{lect.title ? `${lect.title} ` : ''}{lect.username}</div>
                  <div className="text-sm text-muted-foreground">{lect.surname}</div>
                  <div className="text-sm text-muted-foreground">{lect.email}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Lecturer Card */}
          {selectedLecturer && (
            <div ref={detailRef} className="mt-10 bg-white rounded-2xl shadow-xl p-6 border border-border">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-foreground">Lecturer Details</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCloseDetail}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-36 h-48 flex-shrink-0">
                  <img
                    src={selectedLecturer.photo_url?.startsWith('http') ? selectedLecturer.photo_url : `/${selectedLecturer.photo_url}`}
                    alt={selectedLecturer.username}
                    className="w-full h-full object-cover rounded-xl border border-muted shadow-sm"
                  />
                </div>
                
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground">
                      {selectedLecturer.title ? `${selectedLecturer.title} ` : ''}{selectedLecturer.username}
                    </h3>
                    <p className="text-muted-foreground">{selectedLecturer.surname}</p>
                  </div>
                  
                  <a 
                    href={`mailto:${selectedLecturer.email}`}
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    {selectedLecturer.email}
                  </a>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Room: {selectedLecturer.roomID}
                    </span>
                    <span className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {selectedLecturer.floor}
                    </span>
                  </div>
                  
                  {/* Expertise Section */}
                  <div className="pt-3">
                    <h4 className="font-medium text-foreground mb-2">Areas of Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {parseExpertise(selectedLecturer.expertise).length > 0 ? (
                        parseExpertise(selectedLecturer.expertise).map((exp, i) => (
                          <span
                            key={i}
                            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {exp}
                          </span>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-sm">No expertise listed</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={() => {
                        const route = getFloorRoute(selectedLecturer.floor);
                        navigate(`${route}?room=${selectedLecturer.roomID}`);
                      }}
                    >
                      Go to Room
                    </Button>
                    <Button variant="outline" onClick={handleCloseDetail}>
                      Done
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Lecturers;