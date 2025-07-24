import React, { useState, useEffect } from 'react';
import { useRoomContext } from '@/contexts/RoomContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/lib/supabaseClient';

const Lecturers: React.FC = () => {
  const navigate = useNavigate();
  const { lecturers, lecturersLoading, lecturersError } = useRoomContext();

  // --- Academic Advisor Search State ---
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<{ "Student Name": string; "Academic Advisor": string }[]>([]);
  const [loading, setLoading] = useState(false);

  // Helper to map floor string to route
  const getFloorRoute = (floor: string) => {
    switch (floor.toLowerCase()) {
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Academic Advisor Search */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Search Academic Advisor</h2>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 mb-2"
            placeholder="Enter student name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {loading && <div className="text-sm text-gray-500">Searching...</div>}
          {results.length > 0 && (
            <table className="w-full mt-4 border text-left">
              <thead>
                <tr>
                  <th className="border px-2 py-1">Student Name</th>
                  <th className="border px-2 py-1">Academic Advisor</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row, i) => (
                  <tr key={i}>
                    <td className="border px-2 py-1">{row["Student Name"]}</td>
                    <td className="border px-2 py-1">{row["Academic Advisor"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {search && !loading && results.length === 0 && (
            <div className="text-sm text-gray-500 mt-2">No results found.</div>
          )}
        </section>
        {/* Back button */}
        <div className="mb-4">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            className="flex items-center gap-2"
            aria-label="Go back"
          >
            <ArrowLeft className="mr-1" />
            Back
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-light mb-2">Lecturers Room Directory</h1>
          <p className="text-lg text-muted-foreground">
            Click on a lecturer to go directly to their office on the 3D floor plan.
          </p>
        </div>

        {/* Lecturers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...lecturers]
            .sort((a, b) => {
              const [titleA,...nameA] = a.displayName.split(' ');
              const [titleB,...nameB] = b.displayName.split(' ');

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
                  src={lect.photo?.startsWith('http') ? lect.photo : `/${lect.photo}`}
                  alt={lect.displayName}
                  className="w-full h-full object-cover rounded-lg border border-muted"
                  loading={idx < 4 ? 'eager' : 'lazy'}
                />
              </div>
              <div className="flex-1">
                <div className="font-medium">{lect.displayName}</div>
                <div className="text-sm text-gray-600">{lect.surname}</div>
                <Button
                  size="sm"
                  className="mt-1"
                  variant="secondary"
                  onClick={() => {
                    const route = getFloorRoute(lect.floor);
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
  );
};

export default Lecturers;
