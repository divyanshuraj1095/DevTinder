import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Mail, Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import toast from 'react-hot-toast';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    try {
      await login(email, password);
      toast.success("Successfully logged in!");
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to login. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl glass-panel rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
      >
        {/* Left Side - Form */}
        <div className="flex-1 p-8 sm:p-12">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
              <Code2 size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl text-white">DevTinder</span>
          </Link>

          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-slate-400 mb-8">Sign in to continue connecting with developers.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-900/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-slate-300">Password</label>
                <a href="#" className="text-sm text-brand-purple hover:text-purple-400">Forgot password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-900/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button type="submit" variant="gradient" fullWidth size="lg" isLoading={isLoading}>
              Sign In
            </Button>
          </form>

          <p className="mt-8 text-center text-slate-400 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-brand-purple hover:text-purple-400 font-medium">
              Create an account
            </Link>
          </p>
        </div>

        {/* Right Side - Image/Pattern */}
        <div className="hidden md:block flex-1 bg-gradient-to-br from-brand-purple to-brand-blue relative p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
          
          <div className="relative z-10 h-full flex flex-col justify-end text-white">
            <h3 className="text-3xl font-bold mb-4">"The best way to predict the future is to invent it."</h3>
            <p className="text-lg opacity-80">— Alan Kay</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
