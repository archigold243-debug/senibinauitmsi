import React, { useState, useEffect } from 'react';
import { useRoomContext } from '@/contexts/RoomContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/lib/supabaseClient';
import ExpertiseFilter from '@/components/ExpertiseFilter';
import Layout from '@/components/Layout';

const Lecturers: React.FC = () => {
  const navigate = useNavigate();
  const { lecturers, lecturersLoading, lecturersError } = useRoomContext();
  // Debug: log lecturers array to check expertise field
  useEffect(() => {
    console.log('Lecturers from context:', lecturers);
  }, [lecturers]);
  const [selectedExpertise, setSelectedExpertise] = useState('');
  const [filteredLecturers, setFilteredLecturers] = useState(lecturers);
  useEffect(() => {
    if (!selectedExpertise) {
      setFilteredLecturers(lecturers);
    } else {
      setFilteredLecturers(
        lecturers.filter(lect => {
          // Support array, string, or comma-separated string for expertise
          let expertise = lect.expertise || [];
          if (typeof expertise === 'string') {
            expertise = expertise.split(',').map(e => e.trim());
          }
          // Compare expertise IDs as strings
          return Array.isArray(expertise) && expertise.map(String).includes(selectedExpertise);
        })
      );
    }
  }, [selectedExpertise, lecturers]);

  // --- Student Search State ---
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<{ "Student Name": string; "Batch Name": string; "Intake": string  }[]>([]);
  const [loading, setLoading] = useState(false);

  // Helper to map floor string to route
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
  } 

  useEffect(() => {
    if (search.trim() === '') {
      setResults([]);
      return;
    }
    setLoading(true);
    const fetchResults = async () => {
      const { data, error } = await supabase
        .from('academic_advisor')
        .select('"Student Name", "Academic Advisor"')
        .ilike('Student Name', `%${search}%`);
      if (!error && data) {
        setResults(data);
      } else {
        setResults([]);
      }
      setLoading(false);
    };
    const timeout = setTimeout(fetchResults, 300); // debounce
    return () => clearTimeout(timeout);
  }, [search]);

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
              Click on a lecturer to go directly to their office on the 3D floor plan.
            </p>
            {/* Expertise Dropdown */}
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
                className="bg-white rounded-xl shadow p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
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
                  <div className="text-sm text-gray-600">{lect.surname}</div>
                  <div className="text-sm text-gray-600">{lect.email}</div>
                  <Button
                    size="sm"
                    className="mt-1"
                    variant="secondary"
                    onClick={() => {
                      console.log('Lecturer ID:', lect.id);
                      console.log('Lecturer Username:', lect.username);
                      console.log('Lecturer Floor:', lect.floor);
                      console.log('Lecturer Room ID:', lect.roomID);
                      const route = getFloorRoute(lect.floor);
                      console.log('Navigating to:', `${route}?room=${lect.roomID}`);
                      navigate(`${route}?room=${lect.roomID}`);
                    }}
                  >
                    Go to Room
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Lecturers;
