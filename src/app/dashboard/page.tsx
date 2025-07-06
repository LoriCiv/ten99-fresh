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
    console.error('Firebase Admin Initialization Error:', (error as Error).message);
  }
}

const db = admin.firestore();

interface Appointment {
  id: string;
  description: string;
  startTime: string;
}

async function getPendingAppointments(): Promise<Appointment[]> {
  try {
    const snapshot = await db.collection('pendingAppointments').where('status', '==', 'pending').get();
    if (snapshot.empty) return [];
    const appointments = snapshot.docs.map((doc: admin.firestore.QueryDocumentSnapshot) => ({
      id: doc.id,
      ...doc.data(),
    })) as Appointment[];
    return appointments;
  } catch (error) {
    console.error("Error fetching pending appointments:", (error as Error).message);
    return []; 
  }
}

async function getConfirmedAppointments(): Promise<Appointment[]> {
  try {
    const snapshot = await db.collection('pendingAppointments').where('status', '==', 'confirmed').get();
    if (snapshot.empty) return [];
    const appointments = snapshot.docs.map((doc: admin.firestore.QueryDocumentSnapshot) => ({
      id: doc.id,
      ...doc.data(),
    })) as Appointment[];
    return appointments;
  } catch (error) {
    console.error("Error fetching confirmed appointments:", (error as Error).message);
    return []; 
  }
}

export default async function DashboardPage() {
  const pendingAppointments = await getPendingAppointments();
  const confirmedAppointments = await getConfirmedAppointments();

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
