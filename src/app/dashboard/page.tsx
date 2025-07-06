import admin from 'firebase-admin';

// This safely initializes Firebase on the server
if (!admin.apps.length) {
  try {
    // We need to assert the type of the env variable as a string
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } catch (error: any) { // Type the error to avoid implicit any
    console.error('Firebase Admin Initialization Error:', error.message);
  }
}

const db = admin.firestore();

// Define a type for our appointment data for better type safety
interface Appointment {
  id: string;
  description: string;
  startTime: string;
  // Add any other fields you expect from your document
}

async function getPendingAppointments(): Promise<Appointment[]> {
  try {
    const appointmentsSnapshot = await db.collection('pendingAppointments').where('status', '==', 'pending').get();
    if (appointmentsSnapshot.empty) {
      return [];
    }
    // Convert the documents to our defined Appointment type
    const appointments = appointmentsSnapshot.docs.map(doc => ({
      id: doc.id,
      description: doc.data().description,
      startTime: doc.data().startTime,
    })) as Appointment[];
    return appointments;
  } catch (error: any) { // Type the error
    console.error("Error fetching appointments:", error.message);
    return []; 
  }
}

export default async function DashboardPage() {
  const appointments = await getPendingAppointments();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold">Admin Dashboard</h1>
      <p className="mt-2 text-lg text-gray-600">Welcome to your private dashboard!</p>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold border-b pb-2">Pending Appointments</h2>
        <div className="mt-4 space-y-4">
          {appointments.length > 0 ? (
            // Use our defined Appointment type for the 'appt' parameter
            appointments.map((appt: Appointment) => (
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
    </div>
  );
}
