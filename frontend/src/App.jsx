import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { AnimatePresence } from 'framer-motion';

// Layout
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { DeveloperProfile } from './pages/DeveloperProfile';
import { EditProfile } from './pages/EditProfile';
import { Connections } from './pages/Connections';
import { Requests } from './pages/Requests';
import { Explore } from './pages/Explore';
import { Chat } from './pages/Chat';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="h-screen flex items-center justify-center text-white">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  
  return children;
};

// Route wrapper for animations
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/explore" element={<Explore />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
            <Route path="/profile/:id" element={<ProtectedRoute><DeveloperProfile /></ProtectedRoute>} />
            <Route path="/connections" element={<ProtectedRoute><Connections /></ProtectedRoute>} />
            <Route path="/requests" element={<ProtectedRoute><Requests /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
      {/* Hide footer on Dashboard (Swipe feed) to maximize screen space */}
      {location.pathname !== '/dashboard' && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AnimatedRoutes />
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#f8fafc',
              border: '1px solid #334155',
            },
            success: {
              iconTheme: { primary: '#10b981', secondary: '#1e293b' },
            },
          }} 
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
