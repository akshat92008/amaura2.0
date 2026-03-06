import { useEffect, useState } from 'react';
import { Lead } from '../types';
import { useAuth } from './useAuth';
import { db } from '../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export const useLeads = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLeads([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const leadsRef = collection(db, 'leads');
    
    // Construct query with data isolation
    let q;
    if (user.role === 'admin') {
      // Super Admin sees everything
      q = query(leadsRef);
    } else {
      // Tenants only see their own leads
      q = query(leadsRef, where('tenantID', '==', user.tenantID));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Lead[];
      
      setLeads(leadsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching leads:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return { leads, loading };
};
