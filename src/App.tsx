import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { ClientDashboard } from './pages/ClientDashboard';
import { AdminDashboard } from './pages/AdminDashboard';

import { ThemeProvider } from './contexts/ThemeContext';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const initAuth = useAuth(state => state.init);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <ThemeProvider>
      <Router>
      <div className="flex flex-col min-h-screen bg-amaura-bg text-amaura-text font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ClientDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </ThemeProvider>
  );
}
