"use client";

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Define a single, consistent type for the calendar's value
type CalendarValue = Date | [Date | null, Date | null] | null;

interface Appointment {
  id: string;
  description: string;
  startTime: string;
}

export default function DashboardClient({ initialAppointments }: { initialAppointments: Appointment[] }) {
  const [appointments, setAppointments] = useState(initialAppointments);
  // Use our new consistent type for the state
  const [value, onChange] = useState<CalendarValue>(new Date());
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleAccept = async (appointmentId: string) => {
    setLoadingId(appointmentId); 

    try {
      const response = await fetch('/api/accept', {
        method: 'POST',
        body: JSON.stringify({ id: appointmentId }),
      });

      if (!response.ok) {
        throw new Error('Failed to accept appointment');
      }

      setAppointments(prev => prev.filter(appt => appt.id !== appointmentId));

    } catch (error) {
      console.error("Error:", error);
      alert("There was an error accepting the appointment.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* Left Column: Appointments */}
      <div className="md:col-span-2">
        <h2 className="text-2xl font-semibold border-b pb-2">Pending Appointments</h2>
        <div className="mt-4 space-y-4">
          {appointments.length > 0 ? (
            appointments.map((appt) => (
              <div key={appt.id} className="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center">
                <div>
                  <p><strong>Description:</strong> {appt.description}</p>
                  <p><strong>Start Time:</strong> {new Date(appt.startTime).toLocaleString()}</p>
                </div>
                <div className="space-x-2 flex-shrink-0">
                  <button 
                    onClick={() => handleAccept(appt.id)}
                    disabled={loadingId === appt.id}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:bg-gray-400"
                  >
                    {loadingId === appt.id ? 'Accepting...' : 'Accept'}
                  </button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">Decline</button>
                </div>
              </div>
            ))
          ) : (
            <p className="mt-4 text-gray-500">No pending appointments.</p>
          )}
        </div>
      </div>

      {/* Right Column: Calendar */}
      <div className="md:col-span-1">
        <h2 className="text-2xl font-semibold border-b pb-2">Your Schedule</h2>
        <div className="mt-4">
          {/* The Calendar now uses the consistent type and will not error */}
          <Calendar onChange={onChange} value={value} className="mx-auto" />
        </div>
      </div>

    </div>
  );
}
