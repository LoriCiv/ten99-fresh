"use client";

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Type for the calendar's value
type CalendarValue = Date | [Date | null, Date | null] | null;

// Type for an appointment
interface Appointment {
  id: string;
  description: string;
  startTime: string;
}

// The component now accepts two lists of appointments
export default function DashboardClient({ initialPending, initialConfirmed }: { initialPending: Appointment[], initialConfirmed: Appointment[] }) {
  const [pending, setPending] = useState(initialPending);
  const [confirmed, setConfirmed] = useState(initialConfirmed);
  const [calendarDate, setCalendarDate] = useState<CalendarValue>(new Date());
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleAccept = async (appointmentToAccept: Appointment) => {
    setLoadingId(appointmentToAccept.id);

    try {
      const response = await fetch('/api/accept', {
        method: 'POST',
        body: JSON.stringify({ id: appointmentToAccept.id }),
      });

      if (!response.ok) throw new Error('Failed to accept appointment');

      // Add the accepted appointment to the confirmed list
      // and remove it from the pending list
      const newlyConfirmed = { ...appointmentToAccept, status: 'confirmed' };
      setConfirmed(prev => [...prev, newlyConfirmed]);
      setPending(prev => prev.filter(appt => appt.id !== appointmentToAccept.id));
      
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error accepting the appointment.");
    } finally {
      setLoadingId(null);
    }
  };

  // --- NEW FUNCTION TO ADD DOTS TO CALENDAR ---
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      // Find if there is a confirmed appointment on this date
      const hasAppointment = confirmed.some(
        (appt) => new Date(appt.startTime).toDateString() === date.toDateString()
      );

      // If there is an appointment, return a dot
      if (hasAppointment) {
        return <div className="h-2 w-2 bg-blue-500 rounded-full mx-auto mt-1"></div>;
      }
    }
    return null; // Return null if no appointment
  };
  // --- END OF NEW FUNCTION ---

  return (
    <div className="p-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* Left Column: Appointments */}
      <div className="md:col-span-2 space-y-10">
        {/* Pending Appointments Section */}
        <div>
            <h2 className="text-2xl font-semibold border-b pb-2">Pending Appointments</h2>
            <div className="mt-4 space-y-4">
              {pending.length > 0 ? (
                pending.map((appt) => (
                  <div key={appt.id} className="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center">
                    <div>
                      <p><strong>Description:</strong> {appt.description}</p>
                      <p><strong>Start Time:</strong> {new Date(appt.startTime).toLocaleString()}</p>
                    </div>
                    <div className="space-x-2 flex-shrink-0">
                      <button 
                        onClick={() => handleAccept(appt)}
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
        
        {/* Confirmed Appointments Section */}
        <div>
            <h2 className="text-2xl font-semibold border-b pb-2">Confirmed Appointments</h2>
            <div className="mt-4 space-y-4">
              {confirmed.length > 0 ? (
                confirmed.map((appt) => (
                  <div key={appt.id} className="p-4 border rounded-lg shadow-sm bg-green-50">
                    <p><strong>Description:</strong> {appt.description}</p>
                    <p><strong>Start Time:</strong> {new Date(appt.startTime).toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <p className="mt-4 text-gray-500">No confirmed appointments.</p>
              )}
            </div>
        </div>
      </div>

      {/* Right Column: Calendar */}
      <div className="md:col-span-1">
        <h2 className="text-2xl font-semibold border-b pb-2">Your Schedule</h2>
        <div className="mt-4">
          <Calendar 
            onChange={setCalendarDate} 
            value={calendarDate} 
            className="mx-auto"
            // --- NEW PROP TO RENDER THE DOTS ---
            tileContent={tileContent}
          />
        </div>
      </div>

    </div>
  );
}
