import { NextResponse } from 'next/server';
import admin from 'firebase-admin';

// Initialize Firebase
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

export const dynamic = 'force-dynamic'; // Ensures this route is always run on the server

export async function GET() {
  try {
    const pendingSnapshot = await db.collection('pendingAppointments').where('status', '==', 'pending').get();
    const confirmedSnapshot = await db.collection('pendingAppointments').where('status', '==', 'confirmed').get();

    const pending = pendingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const confirmed = confirmedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ pending, confirmed });
  } catch (error: any) {
    console.error("Error fetching appointments:", error.message);
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}
