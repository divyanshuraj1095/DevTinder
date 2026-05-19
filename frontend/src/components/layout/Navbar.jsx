import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Code2, Bell, Menu, X, LogOut, User, Users, MessageSquare, LayoutGrid } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { usePendingRequests } from '../../hooks/usePendingRequests';
import { Avatar } from '../ui/Avatar';
import { getPhotoUrl } from '../../utils/userDisplay';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { count: pendingCount } = usePendingRequests(user ? 45000 : 0);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const authLinks = [
    { name: 'Feed', path: '/feed', icon: LayoutGrid },
    { name: 'Requests', path: '/requests', icon: Bell, badge: pendingCount },
    { name: 'Connections', path: '/connections', icon: Users },
    { name: 'Chat', path: '/chat', icon: MessageSquare },
  ];

  const publicLinks = [
    { name: 'Features', path: '/#features' },
    { name: 'Login', path: '/login' },
  ];

  const navLinks = user ? authLinks : publicLinks;

  const linkClass = (path) => {
    const active =
      location.pathname === path ||
      (path === '/chat' && location.pathname.startsWith('/chat')) ||
      (path === '/requests' && location.pathname.startsWith('/requests'));
    return active ? 'text-brand-purple' : 'text-slate-300 hover:text-white';
  };

  return (
    <nav className="fixed top-0 inset-x-0 h-16 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <Link to={user ? '/feed' : '/'} className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Code2 size={20} className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            Dev<span className="text-transparent bg-clip-text bg-gradient-brand">Tinder</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className={`text-sm font-medium transition-colors relative ${linkClass(link.path)}`}>
              {link.name}
              {link.badge > 0 && (
                <span className="absolute -top-2 -right-3 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold bg-brand-pink text-white rounded-full">
                  {link.badge > 9 ? '9+' : link.badge}
                </span>
              )}
            </Link>
          ))}

          {!user && (
            <Link to="/signup" className="px-4 py-2 bg-gradient-brand text-white rounded-xl text-sm font-medium hover:shadow-glow-purple transition-all">
              Get Started
            </Link>
          )}

          {user && (
            <div className="flex items-center border-l border-slate-800 pl-6 ml-2">
              <div className="relative">
                <button type="button" onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className="focus:outline-none">
                  <Avatar src={getPhotoUrl(user)} alt={user.firstName} size="sm" className="ring-2 ring-slate-800 hover:ring-brand-purple transition-all" />
                </button>
                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl py-1"
                    >
                      <Link to="/profile" onClick={() => setIsProfileDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white">
                        <User size={16} /> Profile
                      </Link>
                      <button type="button" onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-400 hover:bg-slate-700 text-left">
                        <LogOut size={16} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        <button type="button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-slate-400 hover:text-white">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden">
            <div className="px-4 pt-2 pb-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium relative ${linkClass(link.path)}`}>
                  {link.icon && <link.icon size={18} />}
                  {link.name}
                  {link.badge > 0 && (
                    <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full bg-brand-pink text-white">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-slate-300">
                    <User size={18} /> Profile
                  </Link>
                  <button type="button" onClick={handleLogout} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-rose-400 text-left">
                    <LogOut size={18} /> Logout
                  </button>
                </>
              ) : (
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="mt-4 px-3 py-3 bg-gradient-brand text-white rounded-lg text-sm font-medium text-center">
                  Get Started
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
