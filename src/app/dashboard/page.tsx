import admin from 'firebase-admin';
import DashboardClient from './DashboardClient';

// This safely initializes Firebase on the server
if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } catch (error) {
    // This provides a specific type for the caught error
    console.error('Firebase Admin Initialization Error:', (error as Error).message);
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
  } catch (error) {
     // This provides a specific type for the caught error
    console.error("Error fetching appointments:", (error as Error).message);
    return []; 
  }
}

export default async function DashboardPage() {
  const appointments = await getPendingAppointments();

  return (
    <>
      <h1 className="text-4xl font-bold text-center mt-8">Admin Dashboard</h1>
      <DashboardClient initialAppointments={appointments} />
    </>
  );
}
