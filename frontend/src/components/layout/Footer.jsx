import React from 'react';
import { Code2, Globe, Link as LinkIcon, Hash } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
                <Code2 size={20} className="text-white" />
              </div>
              <span className="font-bold text-xl text-white">DevTinder</span>
            </Link>
            <p className="text-slate-400 max-w-sm mb-6">
              Connect with developers, share projects, and build amazing things together. The ultimate networking platform for tech professionals.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-brand-purple transition-colors">
                <Globe size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-brand-blue transition-colors">
                <LinkIcon size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-brand-pink transition-colors">
                <Hash size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><Link to="/explore" className="text-slate-400 hover:text-white transition-colors">Explore Developers</Link></li>
              <li><Link to="/login" className="text-slate-400 hover:text-white transition-colors">Login</Link></li>
              <li><Link to="/signup" className="text-slate-400 hover:text-white transition-colors">Sign Up</Link></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} DevTinder. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm flex items-center gap-1 mt-2 md:mt-0">
            Built with <span className="text-rose-500">♥</span> for developers
          </p>
        </div>
      </div>
    </footer>
  );
};
