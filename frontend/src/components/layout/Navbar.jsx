import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Code2, Bell, Menu, X, LogOut, User, Users, Compass } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Avatar } from '../ui/Avatar';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = user ? [
    { name: 'Feed', path: '/dashboard', icon: Code2 },
    { name: 'Explore', path: '/explore', icon: Compass },
    { name: 'Connections', path: '/connections', icon: Users },
  ] : [
    { name: 'Features', path: '/#features' },
    { name: 'Login', path: '/login' },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 h-16 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
            <Code2 size={20} className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            Dev<span className="text-transparent bg-clip-text bg-gradient-brand">Tinder</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.path 
                  ? 'text-brand-purple' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {!user && (
            <Link to="/signup" className="px-4 py-2 bg-gradient-brand text-white rounded-xl text-sm font-medium hover:shadow-glow-purple transition-all">
              Get Started
            </Link>
          )}

          {user && (
            <div className="flex items-center gap-4 border-l border-slate-800 pl-6 ml-2">
              <Link to="/requests" className="relative p-2 text-slate-400 hover:text-white transition-colors">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-pink rounded-full border border-slate-900"></span>
              </Link>
              
              <div className="relative">
                <button 
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <Avatar src={user.photoUrl} alt={user.firstName} size="sm" className="ring-2 ring-slate-800 hover:ring-brand-purple transition-all" />
                </button>

                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl py-1"
                    >
                      <Link 
                        to={`/profile/${user._id}`} 
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white"
                      >
                        <User size={16} /> Profile
                      </Link>
                      <button 
                        onClick={() => { setIsProfileDropdownOpen(false); handleLogout(); }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-400 hover:bg-slate-700 hover:text-rose-300 text-left"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium ${
                    location.pathname === link.path 
                      ? 'bg-slate-800 text-brand-purple' 
                      : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  {link.icon && <link.icon size={18} />}
                  {link.name}
                </Link>
              ))}
              
              {!user ? (
                <Link 
                  to="/signup" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 px-3 py-3 bg-gradient-brand text-white rounded-lg text-sm font-medium text-center"
                >
                  Get Started
                </Link>
              ) : (
                <>
                  <div className="h-px bg-slate-800 my-2"></div>
                  <Link 
                    to={`/profile/${user._id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800/50 hover:text-white"
                  >
                    <User size={18} /> My Profile
                  </Link>
                  <Link 
                    to="/requests"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800/50 hover:text-white"
                  >
                    <Bell size={18} /> Notifications
                  </Link>
                  <button 
                    onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-rose-400 hover:bg-slate-800/50 hover:text-rose-300 text-left"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
