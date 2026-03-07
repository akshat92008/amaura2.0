import { Handler } from '@netlify/functions';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Environment variables from Netlify
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const handler: Handler = async (event, context) => {
  // CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { tenantID, ...leadData } = body;

    if (!tenantID) {
      console.error('Missing tenantID in request body');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'tenantID is required to route the lead.' }),
      };
    }

    if (!leadData.email && !leadData.phone) {
      console.error('Missing contact info for tenant:', tenantID);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Contact information (email or phone) is required.' }),
      };
    }

    // Insert lead into Firestore
    const leadsRef = collection(db, 'leads');
    const docRef = await addDoc(leadsRef, {
      ...leadData,
      tenantID,
      createdAt: Date.now(),
      status: 'new'
    });

    console.log(`✅ Lead ${docRef.id} successfully routed for tenant: ${tenantID}`);

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        message: 'Lead routed successfully',
        lead: { id: docRef.id, tenantID, ...leadData },
      }),
    };
  } catch (error) {
    console.error('❌ Error routing lead:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
