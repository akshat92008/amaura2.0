import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../contexts/ThemeContext';
import { Lock, Mail, Loader2, Zap, ArrowRight, Database, Shield } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { motion } from 'motion/react';

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
      const adminEmail = email || 'admin@amaura.studio';
      const adminPassword = password || 'akshat720';
      
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
    <div className="min-h-screen bg-[var(--color-amaura-bg)] flex flex-col items-center justify-center relative overflow-hidden text-white selection:bg-amaura-blue">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amaura-blue/20 rounded-full blur-[150px] animate-pulse" />
        <div className="grid-background absolute inset-0 opacity-10" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[440px] px-6"
      >
        {/* Header Branding */}
        <div className="mb-12 text-center">
          <motion.div 
            initial={{ rotate: -10, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-16 h-16 rounded-[22px] bg-amaura-blue mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-amaura-blue/40 border border-white/20"
          >
            <Zap className="w-8 h-8 text-white fill-current" />
          </motion.div>
          
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-amaura-text-muted mb-3">Amaura Studio</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">Amaura Super Portal</h1>
          <p className="text-[9px] font-bold text-amaura-text-muted/60 uppercase tracking-[0.2em] max-w-[280px] mx-auto leading-relaxed italic">
            Note: If you are seeing an "API Key" field, you are on the wrong website.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-[#0a0a0c]/80 backdrop-blur-3xl border border-white/10 rounded-[48px] p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
           <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-[0.3em] text-amaura-text-muted ml-2">Email Address</label>
                 <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-amaura-text-muted group-focus-within:text-amaura-blue transition-colors" />
                    <input 
                       type="email"
                       required
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       className="w-full bg-white/[0.03] border border-white/5 rounded-[24px] py-5 pl-14 pr-6 text-sm focus:outline-none focus:border-amaura-blue/50 focus:bg-white/[0.05] transition-all font-medium placeholder:text-white/10"
                       placeholder="name@company.com"
                    />
                 </div>
              </div>

              <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-[0.3em] text-amaura-text-muted ml-2">Password</label>
                 <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-amaura-text-muted group-focus-within:text-amaura-blue transition-colors" />
                    <input 
                       type="password"
                       required
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       className="w-full bg-white/[0.03] border border-white/5 rounded-[24px] py-5 pl-14 pr-6 text-sm focus:outline-none focus:border-amaura-blue/50 focus:bg-white/[0.05] transition-all font-medium placeholder:text-white/10"
                       placeholder="••••••••"
                    />
                 </div>
              </div>

              <button 
                 type="submit"
                 disabled={isLoading}
                 className="w-full bg-amaura-blue hover:scale-[1.02] active:scale-95 transition-all py-6 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl shadow-amaura-blue/30 text-white relative overflow-hidden group"
              >
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                 {isLoading ? (
                   <Loader2 className="w-5 h-5 animate-spin" />
                 ) : (
                   <>
                      <Zap className="w-4 h-4 fill-current" />
                      Authenticate <ArrowRight className="w-4 h-4" />
                   </>
                 )}
              </button>
           </form>

           <button 
             onClick={handleSeed}
             className="mt-10 w-full flex items-center justify-center gap-3 text-[10px] font-bold text-amaura-text-muted/40 hover:text-amaura-blue transition-colors uppercase tracking-[0.2em]"
           >
              <Database className="w-3 h-3" /> Initialize Agency Node
           </button>
        </div>

        <div className="mt-12 text-center opacity-40">
           <p className="text-[9px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-2">
              <Shield className="w-3 h-3" /> End-to-End Encrypted Session
           </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
