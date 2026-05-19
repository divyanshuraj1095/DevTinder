import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import toast from 'react-hot-toast';

export const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsLoading(true);
    try {
      await signup(formData);
      toast.success("Account created successfully!");
      navigate('/feed');
    } catch (error) {
      toast.error(error.parsedMessage || 'Failed to create account.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl glass-panel rounded-3xl overflow-hidden flex flex-col md:flex-row-reverse shadow-2xl"
      >
        {/* Left Side (Actually Right structurally) - Form */}
        <div className="flex-1 p-8 sm:p-12">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
              <Code2 size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl text-white">DevTinder</span>
          </Link>

          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-slate-400 mb-8">Join the largest network of developers today.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-slate-500" />
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-900/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
                    placeholder="John"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-slate-700 rounded-xl bg-slate-900/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-900/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-500" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-900/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button type="submit" variant="gradient" fullWidth size="lg" isLoading={isLoading} className="mt-6">
              Sign Up
            </Button>
          </form>

          <p className="mt-8 text-center text-slate-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-blue hover:text-blue-400 font-medium">
              Sign in
            </Link>
          </p>
        </div>

        {/* Right Side (Actually Left) - Image/Pattern */}
        <div className="hidden md:block flex-1 bg-gradient-to-tl from-brand-blue to-emerald-500 relative p-12 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div>
          
          <div className="relative z-10 h-full flex flex-col justify-center text-white">
            <h3 className="text-4xl font-extrabold mb-6 leading-tight">Build your network.<br/>Find your tribe.</h3>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center gap-3"><span className="text-brand-purple bg-white rounded-full p-1"><Code2 size={16}/></span> Connect with like-minded devs</li>
              <li className="flex items-center gap-3"><span className="text-brand-blue bg-white rounded-full p-1"><User size={16}/></span> Showcase your projects</li>
              <li className="flex items-center gap-3"><span className="text-emerald-500 bg-white rounded-full p-1"><Lock size={16}/></span> Secure & Private</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
