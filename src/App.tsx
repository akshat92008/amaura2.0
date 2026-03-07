import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { ClientDashboard } from './pages/ClientDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Leads } from './pages/Leads';
import { KanbanBoard } from './pages/KanbanBoard';
import { Projects } from './pages/Projects';
import { Inbox } from './pages/Inbox';
import { ROI } from './pages/ROI';

import { ThemeProvider } from './contexts/ThemeContext';
import { useAuth } from './hooks/useAuth';

const AppContent = () => {
  const initAuth = useAuth(state => state.init);
  const location = useLocation();
  const isDashboardRoute = ['/dashboard', '/leads', '/kanban', '/projects', '/inbox', '/roi', '/settings', '/admin'].includes(location.pathname);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <div className="flex flex-col min-h-screen bg-amaura-bg text-amaura-text font-sans">
      {!isDashboardRoute && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ClientDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/kanban" element={<KanbanBoard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/roi" element={<ROI />} />
        </Routes>
      </main>
      {!isDashboardRoute && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}
