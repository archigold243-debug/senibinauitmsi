
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LecturerCard from './LecturerCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRoomContext } from '@/contexts/RoomContext';
import { supabase } from '@/lib/supabaseClient';

const Lecturers: React.FC = () => {
  const navigate = useNavigate();
  const { lecturers, lecturersLoading, lecturersError } = useRoomContext();

  // --- Academic Advisor Search State ---
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<{ "Student Name": string; "Academic Advisor": string }[]>([]);
  const [loading, setLoading] = useState(false);

  // Optionally, you could fetch error state from context if you add it there

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

  const handleClick = (floor: string, roomID: string) => {
    // NOTE: Use the url format that matches existing routes (e.g., /ground-floor)
    // Assume floor value in context is like "Ground Floor" and convert to "ground-floor"
    const path = `/${floor.toLowerCase().replace(/\s+/g, "-")}`;
    navigate(`${path}?room=${roomID}`);
  };

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
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-light mb-2">Lecturers Room Directory</h1>
          <p className="text-lg text-muted-foreground">
            Click on a lecturer to go directly to their office on the 3D floor plan.
          </p>
        </div>
        {/* Loading/Error/Empty states for lecturers */}
        {lecturersLoading ? (
          <div className="text-center text-gray-500 py-8">Loading lecturers...</div>
        ) : lecturersError ? (
          <div className="text-center text-red-500 py-8">Failed to load lecturers. Please try again later.</div>
        ) : lecturers.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No lecturers found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lecturers.map((lect, idx) => (
              <LecturerCard
                key={lect.id}
                photo={lect.photo}
                displayName={lect.displayName}
                surname={lect.surname}
                role={lect.role}
                floor={lect.floor}
                roomID={lect.roomID}
                onClick={handleClick}
                loadingPriority={idx < 6}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Lecturers;
