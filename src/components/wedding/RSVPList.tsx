// src/components/RSVPList.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase';

interface RSVP {
  id: string | number;
  name: string;
  attendance: string;
  guests: number;
  message?: string | null;
  created_at?: string;
}

export default function RSVPList() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAttendance, setFilterAttendance] = useState('All');

  // Edit State
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [editForm, setEditForm] = useState<Partial<RSVP>>({});

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

  // --- ADMIN FUNCTIONS ---

  // 1. Delete RSVP
  const handleDelete = async (id: string | number) => {
    if (!window.confirm("Are you sure you want to delete this RSVP? (මෙම දත්තය මැකීමට අවශ්‍යද?)")) return;

    try {
      const { error } = await supabase.from('rsvps').delete().eq('id', id);
      if (error) throw error;
      
      // Update UI
      setRsvps(rsvps.filter((rsvp) => rsvp.id !== id));
    } catch (error: any) {
      alert("Error deleting RSVP: " + error.message);
    }
  };

  // 2. Edit RSVP
  const handleEditClick = (rsvp: RSVP) => {
    setEditingId(rsvp.id);
    setEditForm({ ...rsvp });
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    try {
      const { error } = await supabase
        .from('rsvps')
        .update({
          name: editForm.name,
          attendance: editForm.attendance,
          guests: editForm.guests,
          message: editForm.message
        })
        .eq('id', editingId);

      if (error) throw error;

      // Update UI
      setRsvps(rsvps.map(r => r.id === editingId ? { ...r, ...editForm } as RSVP : r));
      setEditingId(null);
    } catch (error: any) {
      alert("Error updating RSVP: " + error.message);
    }
  };

  // 3. Export to CSV (Excel)
  const exportToCSV = () => {
    const headers = ["Name", "Attendance", "Guests", "Message", "Date"];
    const csvContent = [
      headers.join(","),
      ...filteredRsvps.map(r => 
        `"${r.name}","${r.attendance}","${r.guests}","${r.message || ''}","${r.created_at ? new Date(r.created_at).toLocaleDateString() : ''}"`
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "RSVP_List.csv";
    link.click();
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

  if (loading) return <div className="flex justify-center items-center h-64 font-sans font-bold text-gray-700">Loading Admin Panel...</div>;

  return (
    // Added 'font-sans tracking-normal' to enforce clean system fonts
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
        
        {/* CONTROLS (Search, Filter, Export) */}
        <div className="p-6 bg-gray-50 border-b flex flex-col md:flex-row justify-between gap-4 items-center">
          <h2 className="text-2xl font-bold text-gray-800">RSVP Admin Panel</h2>
          
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
            <button 
              onClick={exportToCSV}
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-sm"
            >
              Export CSV
            </button>
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
                <th className="p-4 border-b font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRsvps.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500 text-base">No RSVPs found.</td>
                </tr>
              ) : (
                filteredRsvps.map((rsvp) => (
                  <tr key={rsvp.id} className="hover:bg-gray-50 transition-colors">
                    
                    {/* NAME COLUMN */}
                    <td className="p-4 font-medium text-gray-800 text-base">
                      {editingId === rsvp.id ? (
                        <input 
                          type="text" 
                          value={editForm.name || ''} 
                          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                          className="w-full border border-gray-300 p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                        />
                      ) : (
                        rsvp.name
                      )}
                    </td>

                    {/* ATTENDANCE COLUMN */}
                    <td className="p-4">
                      {editingId === rsvp.id ? (
                        <select 
                          value={editForm.attendance || ''} 
                          onChange={(e) => setEditForm({...editForm, attendance: e.target.value})}
                          className="w-full border border-gray-300 p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 font-sans bg-white"
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      ) : (
                        <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${rsvp.attendance.includes('Yes') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {rsvp.attendance}
                        </span>
                      )}
                    </td>

                    {/* GUESTS COLUMN */}
                    <td className="p-4">
                      {editingId === rsvp.id ? (
                        <input 
                          type="number" 
                          min="0"
                          value={editForm.guests || 0} 
                          onChange={(e) => setEditForm({...editForm, guests: parseInt(e.target.value)})}
                          className="w-20 border border-gray-300 p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                        />
                      ) : (
                        <span className="font-semibold text-gray-700 text-base">{rsvp.guests}</span>
                      )}
                    </td>

                    {/* MESSAGE COLUMN */}
                    <td className="p-4 text-gray-600 text-sm max-w-xs truncate leading-relaxed" title={rsvp.message || ''}>
                      {editingId === rsvp.id ? (
                        <input 
                          type="text" 
                          value={editForm.message || ''} 
                          onChange={(e) => setEditForm({...editForm, message: e.target.value})}
                          className="w-full border border-gray-300 p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                        />
                      ) : (
                        rsvp.message || <span className="text-gray-400 italic">No message</span>
                      )}
                    </td>

                    {/* ACTIONS COLUMN */}
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      {editingId === rsvp.id ? (
                        <>
                          <button onClick={handleSaveEdit} className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 shadow-sm">Save</button>
                          <button onClick={() => setEditingId(null)} className="px-3 py-1.5 bg-gray-200 text-gray-800 rounded-md text-sm font-semibold hover:bg-gray-300 shadow-sm">Cancel</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEditClick(rsvp)} className="text-blue-600 hover:text-blue-800 text-sm font-semibold mr-4">Edit</button>
                          <button onClick={() => handleDelete(rsvp.id)} className="text-red-600 hover:text-red-800 text-sm font-semibold">Delete</button>
                        </>
                      )}
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