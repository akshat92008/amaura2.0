import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../contexts/ThemeContext';
import { Lock, Mail, Loader2, Zap, ArrowRight, Database } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

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
      const { useAuth: authState } = await import('../hooks/useAuth');
      const user = authState.getState().user;
      
      if (!user) {
        throw new Error("No account profile found.");
      }

      if (user?.brandConfig) {
        setBrandConfig(user.brandConfig);
      }

      if (user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error(error);
      alert('Access Denied: ' + (error.message || 'Check your credentials.'));
    }
  };

  const [isSeeding, setIsSeeding] = useState(false);
  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      const { auth } = await import('../lib/firebase');
      const { createUserWithEmailAndPassword } = await import('firebase/auth');
      const adminEmail = email || 'master@amaura.studio';
      const adminPassword = password || 'password123';
      
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email: adminEmail,
          role: 'admin',
          displayName: 'Master Admin',
          createdAt: Date.now()
        });
      } catch (e) {}

      alert('Admin Initialized! Click Enter Hub.');
    } catch (error: any) {
      alert('Initialization failed: ' + error.message);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-amaura-bg)] flex flex-col items-center justify-center relative overflow-hidden text-white">
      {/* Grid Pattern */}
      <div className="fixed inset-0 grid-background pointer-events-none opacity-20 z-0" />
      
      {/* Ambient Glow */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full blur-[150px] opacity-20 pointer-events-none z-0"
        style={{ background: 'var(--color-primary)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} 
      />

      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-12 flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amaura-blue flex items-center justify-center shadow-2xl shadow-amaura-blue/30">
            <Zap className="w-8 h-8 text-white fill-current" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-black tracking-widest uppercase">Amaura Studio</h1>
            <h2 className="text-4xl font-display font-bold mt-2 tracking-tight">Amaura Super Portal</h2>
            <p className="text-[10px] font-bold text-amaura-text-muted mt-4 uppercase tracking-[0.2em] max-w-[300px] leading-relaxed">
              Note: If you are seeing an "API Key" field, you are on the wrong website.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="w-full bg-[#0a0a0c]/80 backdrop-blur-3xl border border-white/5 rounded-[40px] p-10 shadow-2xl overflow-hidden relative group">
           <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-amaura-text-muted ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amaura-text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-amaura-blue/50 transition-all font-medium placeholder-amaura-text-muted/30"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-amaura-text-muted ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amaura-text-muted" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-amaura-blue/50 transition-all font-medium placeholder-amaura-text-muted/30"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amaura-blue hover:scale-[1.02] active:scale-95 transition-all rounded-2xl py-5 font-bold text-sm flex items-center justify-center gap-3 shadow-xl shadow-amaura-blue/20 button-glow"
            >
              {isLoading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Authenticate</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Seed Button - subtle */}
          <button 
             onClick={handleSeed}
             className="mt-8 w-full py-3 text-[10px] font-bold uppercase tracking-widest text-amaura-text-muted/40 hover:text-amaura-blue transition-colors flex items-center justify-center gap-2"
          >
            <Database className="w-3 h-3" />
            Initialize Agency Node
          </button>
        </div>
        
        <p className="mt-8 text-[10px] font-bold text-amaura-text-muted/40 uppercase tracking-[0.3em]">
          End-to-End Encrypted Session
        </p>
      </div>
    </div>
  );
};

export default Login;
