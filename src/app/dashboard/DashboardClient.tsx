"use client";

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface Appointment {
  id: string;
  description: string;
  startTime: string;
}

export default function DashboardClient({ appointments }: { appointments: Appointment[] }) {
  const [value, onChange] = useState<Date | [Date, Date] | null>(new Date());

  return (
    <div className="p-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h2 className="text-2xl font-semibold border-b pb-2">Pending Appointments</h2>
        <div className="mt-4 space-y-4">
          {appointments.length > 0 ? (
            appointments.map((appt) => (
              <div key={appt.id} className="p-4 border rounded-lg shadow-sm bg-white">
                <p><strong>Description:</strong> {appt.description}</p>
                <p><strong>Start Time:</strong> {new Date(appt.startTime).toLocaleString()}</p>
                <div className="mt-3 space-x-2">
                  <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">Accept</button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">Decline</button>
                </div>
              </div>
            ))
          ) : (
            <p className="mt-4 text-gray-500">No pending appointments.</p>
          )}
        </div>
      </div>
      <div className="md:col-span-1">
        <h2 className="text-2xl font-semibold border-b pb-2">Your Schedule</h2>
        <div className="mt-4">
          <Calendar onChange={onChange} value={value} className="mx-auto" />
        </div>
      </div>
    </div>
  );
}
