import admin from 'firebase-admin';
import DashboardClient from './DashboardClient';

// Safely initialize Firebase on the server
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
  // Add other potential fields if they exist
}

async function getPendingAppointments(): Promise<Appointment[]> {
  try {
    // Note: We now look in 'appointments' and filter by status
    const snapshot = await db.collection('appointments').where('status', '==', 'pending').get();
    if (snapshot.empty) return [];
    const appointments = snapshot.docs.map((doc: admin.firestore.QueryDocumentSnapshot) => ({
      id: doc.id,
      ...doc.data(),
    })) as Appointment[];
    return appointments;
  } catch (error: any) {
    console.error("Error fetching pending appointments:", error.message);
    return []; 
  }
}

async function getConfirmedAppointments(): Promise<Appointment[]> {
  try {
    const snapshot = await db.collection('appointments').where('status', '==', 'confirmed').get();
    if (snapshot.empty) return [];
    const appointments = snapshot.docs.map((doc: admin.firestore.QueryDocumentSnapshot) => ({
      id: doc.id,
      ...doc.data(),
    })) as Appointment[];
    return appointments;
  } catch (error: any) {
    console.error("Error fetching confirmed appointments:", error.message);
    return []; 
  }
}

export default async function DashboardPage() {
  // 1. Fetch BOTH sets of data on the server
  const pendingAppointments = await getPendingAppointments();
  const confirmedAppointments = await getConfirmedAppointments();

  // 2. Render the Client Component and pass both lists to it
  return (
    <>
      <h1 className="text-4xl font-bold text-center mt-8">Admin Dashboard</h1>
      <DashboardClient 
        initialPending={pendingAppointments} 
        initialConfirmed={confirmedAppointments} 
      />
    </>
  );
}
