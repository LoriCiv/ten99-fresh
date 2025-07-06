import { NextResponse } from 'next/server';
import admin from 'firebase-admin';

// Initialize Firebase
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

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const pendingSnapshot = await db.collection('pendingAppointments').where('status', '==', 'pending').get();
    const confirmedSnapshot = await db.collection('pendingAppointments').where('status', '==', 'confirmed').get();

    const pending = pendingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const confirmed = confirmedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ pending, confirmed });
  } catch (error) {
    console.error("Error fetching appointments:", (error as Error).message);
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}
