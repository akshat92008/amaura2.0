import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  serverTimestamp, 
  orderBy,
  limit 
} from 'firebase/firestore';
import { useAuth } from './useAuth';
import { getGeminiResponse } from '../lib/gemini';

export interface Message {
  id: string;
  text: string;
  sender: 'ai' | 'user' | 'system';
  createdAt: any;
  tenantID: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'installation' | 'survey' | 'follow-up' | 'meeting' | 'urgent';
  tenantID: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'contract' | 'photo' | 'permit';
  size: string;
  uploadedAt: any;
  tenantID: string;
}

export const useDashboardFeatures = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);

  // AI Chat Logic
  const sendAIMessage = async (text: string) => {
    if (!user) return;
    
    // Add user message to Firestore
    await addDoc(collection(db, 'messages'), {
      text,
      sender: 'user',
      tenantID: user.tenantID || 'admin',
      createdAt: serverTimestamp(),
    });

    // Prepare history for Gemini
    // Filter out messages without createdAt to avoid errors during initial sync
    const history = messages
      .filter(m => m.createdAt)
      .map(m => ({
        role: m.sender === 'user' ? 'user' as const : 'model' as const,
        parts: [{ text: m.text }]
      }));

    // Get real response from Gemini
    const response = await getGeminiResponse(text, history);

    // Add AI message to Firestore
    await addDoc(collection(db, 'messages'), {
      text: response,
      sender: 'ai',
      tenantID: user.tenantID || 'admin',
      createdAt: serverTimestamp(),
    });
  };

  // Calendar Logic
  const addEvent = async (event: Omit<CalendarEvent, 'id' | 'tenantID'>) => {
    if (!user) return;
    await addDoc(collection(db, 'events'), {
      ...event,
      tenantID: user.tenantID || 'admin',
      createdAt: serverTimestamp(),
    });
  };

  useEffect(() => {
    if (!user) return;

    const tenantID = user.tenantID || 'admin';

    // Messages Listener
    const qMessages = query(
      collection(db, 'messages'),
      where('tenantID', '==', tenantID),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    const unsubMessages = onSnapshot(qMessages, (snap) => {
      setMessages(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message)).reverse());
    });

    // Events Listener
    const qEvents = query(collection(db, 'events'), where('tenantID', '==', tenantID));
    const unsubEvents = onSnapshot(qEvents, (snap) => {
      setEvents(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as CalendarEvent)));
    });

    // Documents Listener
    const qDocs = query(collection(db, 'documents'), where('tenantID', '==', tenantID));
    const unsubDocs = onSnapshot(qDocs, (snap) => {
      setDocuments(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Document)));
    });

    return () => {
      unsubMessages();
      unsubEvents();
      unsubDocs();
    };
  }, [user]);

  return { 
    messages, 
    sendAIMessage, 
    events, 
    addEvent,
    documents 
  };
};
