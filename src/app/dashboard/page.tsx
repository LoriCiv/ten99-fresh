import admin from 'firebase-admin';
import DashboardClient from './DashboardClient'; // Import the new component

// This safely initializes Firebase on the server
if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } catch (error: any) {
    console.error('Firebase Admin Initialization Error:', error.message);
  }
}

const db = admin.firestore();

// Define a type for our appointment data
interface Appointment {
  id: string;
  description: string;
  startTime: string;
}

async function getPendingAppointments(): Promise<Appointment[]> {
  try {
    const appointmentsSnapshot = await db.collection('pendingAppointments').where('status', '==', 'pending').get();
    if (appointmentsSnapshot.empty) {
      return [];
    }
    const appointments = appointmentsSnapshot.docs.map((doc: admin.firestore.QueryDocumentSnapshot) => ({
      id: doc.id,
      description: doc.data().description,
      startTime: doc.data().startTime,
    })) as Appointment[];
    return appointments;
  } catch (error: any) {
    console.error("Error fetching appointments:", error.message);
    return []; 
  }
}

// This is the main page component
export default async function DashboardPage() {
  // 1. Fetch data on the server
  const appointments = await getPendingAppointments();

  // 2. Render the Client Component and pass the data to it as a prop
  return (
    <>
      <h1 className="text-4xl font-bold text-center mt-8">Admin Dashboard</h1>
      <DashboardClient appointments={appointments} />
    </>
  );
}
