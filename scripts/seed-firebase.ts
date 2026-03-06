import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, addDoc } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyD_oqFHus8aQsFhpBSCpQv9Qcp3yffGm7A",
  authDomain: "amaura-2eff3.firebaseapp.com",
  projectId: "amaura-2eff3",
  storageBucket: "amaura-2eff3.firebasestorage.app",
  messagingSenderId: "378911819630",
  appId: "1:378911819630:web:101ac9d5dbe3d9256f637f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  console.log('Seeding Firebase...');
  try {
    const adminDoc = doc(db, 'users', 'master_admin');
    await setDoc(adminDoc, {
      email: 'master@amaura.studio',
      role: 'admin',
      displayName: 'Super Admin',
      createdAt: Date.now()
    });
    console.log('✓ Admin created');

    const tenantDoc = doc(db, 'users', 'roofing_admin');
    await setDoc(tenantDoc, {
      email: 'roofing@example.com',
      role: 'tenant_admin',
      tenantID: 'ROOF_001',
      displayName: 'Elite Shield Roofing',
      createdAt: Date.now()
    });
    console.log('✓ Tenant created');

    console.log('Done!');
  } catch (e) {
    console.error('Error:', e);
  }
}

seed();
