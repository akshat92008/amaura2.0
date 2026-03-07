import { useEffect, useState } from 'react';
import { Lead } from '../types';
import { useAuth } from './useAuth';
import { db } from '../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';

export const useLeads = (tenantFilter?: string) => {
  const { user } = useAuth();
  const location = useLocation();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // Extract tenantID from URL query params
  const queryParams = new URLSearchParams(location.search);
  const activeTenantID = tenantFilter || queryParams.get('tenantID');

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
      // Super Admin sees everything UNLESS a specific tenant is requested
      if (activeTenantID) {
        q = query(leadsRef, where('tenantID', '==', activeTenantID));
      } else {
        q = query(leadsRef);
      }
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
  }, [user, activeTenantID]);

  return { leads, loading };
};
