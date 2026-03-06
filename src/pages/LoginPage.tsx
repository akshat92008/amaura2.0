import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useStore } from '../store';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, clients } = useStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication logic
    if (email === 'admin@amaura.studio') {
      login('admin');
      navigate('/admin');
      return;
    }

    const client = clients.find(c => c.email === email);
    if (client) {
      login('client', client.id);
      navigate('/dashboard');
      return;
    }

    alert('Invalid credentials. Try admin@amaura.studio or ceo@apexsolar.com');
  };

  return (
    <div className="min-h-screen bg-amaura-bg flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.05),transparent_50%)]" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-amaura-surface border border-amaura-border flex items-center justify-center mx-auto mb-6 glow-blue">
            <Shield className="w-6 h-6 text-amaura-blue" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Secure Portal</h1>
          <p className="text-amaura-text-muted">Access your revenue infrastructure.</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-amaura-text-muted mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-amaura-text-muted" />
                  </div>
                  <Input 
                    type="email" 
                    placeholder="ceo@apexsolar.com" 
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-amaura-text-muted mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-amaura-text-muted" />
                  </div>
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full gap-2">
              Authenticate <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-amaura-border text-center">
            <p className="text-xs text-amaura-text-muted mb-2">Demo Credentials:</p>
            <div className="flex flex-col gap-1 text-xs font-mono text-amaura-blue">
              <span>admin@amaura.studio</span>
              <span>ceo@apexsolar.com</span>
              <span>owner@proflow.com</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
