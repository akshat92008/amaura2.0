import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../contexts/ThemeContext';
import { Lock, Mail, ChevronRight, Loader2, Database } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, setDoc, collection } from 'firebase/firestore';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const { setBrandConfig } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      await login(email, password);
      
      // In a real app, `login` sets user state, we can listen to `user.brandConfig` 
      // to update the context, or do it immediately here:
      const { useAuth: authState } = await import('../hooks/useAuth');
      const user = authState.getState().user;
      
      if (!user) {
        throw new Error("Login successful, but no account profile was found in the database. Please click 'Initialize Backend Strategy' first.");
      }

      if (user?.brandConfig) {
        setBrandConfig(user.brandConfig);
      }

      if (user?.role === 'admin') {
        navigate('/admin');
      } else if (user?.role === 'tenant_admin') {
        navigate('/dashboard');
      } else {
        // Fallback for unexpected roles
        navigate('/login');
      }
    } catch (error: any) {
      console.error(error);
      alert('Access Denied: ' + (error.message || 'Check your credentials or click Initialize below.'));
    }
  };

  const [isSeeding, setIsSeeding] = useState(false);
  const handleSeed = async () => {
    if (!email || !password) {
      alert('Please enter an email and password in the fields above first. These will become your Super Admin credentials.');
      return;
    }

    setIsSeeding(true);
    try {
      const { auth } = await import('../lib/firebase');
      const { createUserWithEmailAndPassword } = await import('firebase/auth');
      
      // 1. Create the Auth User
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        // 2. Seed the Profile in Firestore using the NEW UID
        await setDoc(doc(db, 'users', uid), {
          email: email,
          role: 'admin',
          displayName: 'Master Admin',
          createdAt: Date.now()
        });
      } catch (adminError: any) {
        if (adminError.code !== 'auth/email-already-in-use') {
          throw adminError;
        }
        console.log('Admin account already exists, continuing to client seed...');
      }

      // 3. Create a formal Client Admin (Tenant)
      const clientEmail = 'roofing@amaura.studio';
      const clientPassword = 'password123';
      
      try {
        const clientCredential = await createUserWithEmailAndPassword(auth, clientEmail, clientPassword);
        await setDoc(doc(db, 'users', clientCredential.user.uid), {
          email: clientEmail,
          role: 'tenant_admin',
          tenantID: 'c1', // Apex Solar mock data
          displayName: 'Elite Shield Roofing',
          brandConfig: {
            primary: '#6366f1',
            logo: 'https://cdn-icons-png.flaticon.com/512/606/606201.png'
          },
          createdAt: Date.now()
        });
      } catch (e: any) {
        console.log('Client user exists or error');
      }

      alert('Database Synced! \n\nClient Login: \nEmail: roofing@amaura.studio \nPass: password123');
    } catch (error: any) {
      console.error(error);
      alert('Initialization failed: ' + error.message);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-amaura-bg)] flex items-center justify-center relative overflow-hidden text-[var(--color-amaura-text)]">
      {/* Background ambient light */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 transition-colors duration-1000 pointer-events-none"
        style={{ 
          background: 'var(--color-primary)', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)' 
        }} 
      />

      <div className="glass-panel w-full max-w-md p-10 rounded-2xl relative z-10 border border-[var(--color-amaura-border)]">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Hub 2.0 Gatekeeper</h1>
          <p className="text-sm text-[var(--color-amaura-text-muted)]">Authenticate to access your workspace</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-amaura-text-muted)]">
              Authorized Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                className="w-full bg-[var(--color-amaura-surface)] border border-[var(--color-amaura-border)] rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all"
                style={{ '--tw-ring-color': 'var(--color-primary)' } as React.CSSProperties}
                placeholder="master@amaura.studio"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-amaura-text-muted)]">
              Passphrase
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[var(--color-amaura-surface)] border border-[var(--color-amaura-border)] rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all"
                style={{ '--tw-ring-color': 'var(--color-primary)' } as React.CSSProperties}
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isLoading || isSeeding}
              className="w-full flex justify-center py-3 px-4 rounded-lg font-medium text-white transition-all hover:-translate-y-0.5 shadow-lg active:scale-[0.98]"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <div className="flex items-center space-x-2">
                  <span>Enter Hub</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              )}
            </button>

            <button
              type="button"
              onClick={handleSeed}
              disabled={isLoading || isSeeding}
              className="w-full flex justify-center py-3 px-4 rounded-lg font-medium text-white transition-all border border-amaura-blue/30 bg-amaura-blue/5 hover:bg-amaura-blue/10 active:scale-[0.98]"
            >
              {isSeeding ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <div className="flex items-center space-x-2">
                  <Database className="h-4 w-4" />
                  <span>First Time? Initialize Admin</span>
                </div>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-[var(--color-amaura-border)] text-center text-xs text-[var(--color-amaura-text-muted)] flex flex-col space-y-2">
          <p>Super Admin: master@amaura.studio</p>
          <p>Tenant Login: roofing@amaura.studio</p>
          <p>Tenant Pass: password123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
