import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ClientData } from '../store';

export const useClients = () => {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const clientsRef = collection(db, 'clients');
    const q = query(clientsRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const clientsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ClientData[];
      
      setClients(clientsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching clients:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addClient = async (client: ClientData) => {
    const docRef = doc(db, 'clients', client.id);
    await setDoc(docRef, client);
  };

  const removeClient = async (clientId: string) => {
    const docRef = doc(db, 'clients', clientId);
    await deleteDoc(docRef);
  };

  const updateClient = async (clientId: string, data: Partial<ClientData>) => {
    const docRef = doc(db, 'clients', clientId);
    await updateDoc(docRef, data);
  };

  return { clients, loading, addClient, removeClient, updateClient };
};
