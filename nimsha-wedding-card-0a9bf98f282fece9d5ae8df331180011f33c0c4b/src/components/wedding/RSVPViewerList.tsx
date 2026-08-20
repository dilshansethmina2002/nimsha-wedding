// src/components/RSVPViewerList.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase';

interface RSVP {
  id: string | number;
  name: string;
  attendance: string;
  guests: number;
  message?: string | null;
}

export default function RSVPViewerList() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAttendance, setFilterAttendance] = useState('All');

  useEffect(() => {
    fetchRSVPs();
  }, []);

  const fetchRSVPs = async () => {
    try {
      const { data, error } = await supabase
        .from('rsvps')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRsvps(data as RSVP[]);
    } catch (error: any) {
      console.error("Error fetching data: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  // --- FILTERING & STATS ---
  const filteredRsvps = rsvps.filter(rsvp => {
    const matchesSearch = rsvp.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterAttendance === 'All' || rsvp.attendance === filterAttendance;
    return matchesSearch && matchesFilter;
  });

  // Calculate Statistics
  const totalAttendingRsvps = rsvps.filter(r => r.attendance === 'Yes' || r.attendance.includes('Yes'));
  const totalGuestsComing = totalAttendingRsvps.reduce((sum, r) => sum + (Number(r.guests) || 0), 0);
  const totalNotComing = rsvps.filter(r => r.attendance === 'No' || r.attendance.includes('No')).length;

  if (loading) return <div className="flex justify-center items-center h-64 font-sans font-bold text-gray-700">Loading Guest List...</div>;

  return (
    // Added 'font-sans' here to ensure clean, system-level readable text throughout the component
    <div className="max-w-6xl mx-auto p-4 md:p-6 mt-10 space-y-6 font-sans tracking-normal">
      
      {/* HEADER & STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <p className="text-sm text-gray-500 uppercase font-semibold tracking-wide">Total Submissions</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{rsvps.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <p className="text-sm text-gray-500 uppercase font-semibold tracking-wide">Total Guests Attending</p>
          <p className="text-3xl font-bold text-green-600 mt-1">{totalGuestsComing}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
          <p className="text-sm text-gray-500 uppercase font-semibold tracking-wide">Attending (Families)</p>
          <p className="text-3xl font-bold text-yellow-600 mt-1">{totalAttendingRsvps.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
          <p className="text-sm text-gray-500 uppercase font-semibold tracking-wide">Not Attending</p>
          <p className="text-3xl font-bold text-red-600 mt-1">{totalNotComing}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* CONTROLS */}
        <div className="p-6 bg-gray-50 border-b flex flex-col md:flex-row justify-between gap-4 items-center">
          <h2 className="text-2xl font-bold text-gray-800">Guest List Viewer</h2>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Search names..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 bg-white"
            />
            <select 
              value={filterAttendance} 
              onChange={(e) => setFilterAttendance(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-700 font-medium"
            >
              <option value="All">All Status</option>
              <option value="Yes">Attending (Yes)</option>
              <option value="No">Not Attending (No)</option>
            </select>
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-xs sm:text-sm uppercase tracking-wider">
                <th className="p-4 border-b font-semibold">Name (නම)</th>
                <th className="p-4 border-b font-semibold">Status (පැමිණීම)</th>
                <th className="p-4 border-b font-semibold">Guests (ගණන)</th>
                <th className="p-4 border-b font-semibold">Message (පණිවිඩය)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRsvps.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500 text-base">No RSVPs found.</td>
                </tr>
              ) : (
                filteredRsvps.map((rsvp) => (
                  <tr key={rsvp.id} className="hover:bg-gray-50 transition-colors">
                    
                    {/* NAME COLUMN */}
                    <td className="p-4 font-medium text-gray-800 text-base">
                      {rsvp.name}
                    </td>

                    {/* ATTENDANCE COLUMN */}
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${rsvp.attendance.includes('Yes') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {rsvp.attendance}
                      </span>
                    </td>

                    {/* GUESTS COLUMN */}
                    <td className="p-4">
                      <span className="font-semibold text-gray-700 text-base">{rsvp.guests}</span>
                    </td>

                    {/* MESSAGE COLUMN */}
                    <td className="p-4 text-gray-600 text-sm max-w-md truncate leading-relaxed" title={rsvp.message || ''}>
                      {rsvp.message || <span className="text-gray-400 italic">No message</span>}
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}