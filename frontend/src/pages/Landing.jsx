import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code2, Users, Zap, Globe, Layout, Terminal, Coffee } from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="glass-card p-6 sm:p-8 hover-glow"
  >
    <div className="w-12 h-12 rounded-xl bg-brand-purple/20 flex items-center justify-center mb-6">
      <Icon size={24} className="text-brand-purple" />
    </div>
    <h3 className="text-xl font-bold text-slate-100 mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </motion.div>
);

export const Landing = () => {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-slate-950">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-purple/20 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-blue/20 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-brand-purple/30 text-brand-purple text-sm font-medium"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-purple opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-purple"></span>
            </span>
            The #1 Networking Platform for Developers
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6"
          >
            Connect with Developers.<br />
            <span className="text-transparent bg-clip-text bg-gradient-brand">Build Together.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 max-w-2xl mx-auto text-xl text-slate-400 mb-10"
          >
            Swipe, match, and collaborate with developers worldwide. Find your next co-founder, mentor, or coding buddy instantly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/signup"
              className="px-8 py-4 bg-gradient-brand text-white rounded-xl text-lg font-semibold shadow-glow-purple hover:scale-105 transition-all"
            >
              Get Started for Free
            </Link>
            <Link
              to="/explore"
              className="px-8 py-4 glass border-slate-700 text-slate-200 rounded-xl text-lg font-semibold hover:bg-slate-800 transition-all"
            >
              Explore Developers
            </Link>
          </motion.div>
        </div>

        {/* Floating Icons Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-1/4 left-1/4 text-brand-purple"><Code2 size={48} /></motion.div>
          <motion.div animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute top-1/3 right-1/4 text-brand-blue"><Layout size={48} /></motion.div>
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 6 }} className="absolute bottom-1/4 left-1/3 text-brand-pink"><Terminal size={48} /></motion.div>
          <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 4.5 }} className="absolute bottom-1/3 right-1/3 text-emerald-500"><Coffee size={48} /></motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why DevTinder?</h2>
            <p className="text-slate-400 text-lg">Everything you need to build your developer network.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Zap}
              title="Smart Matching"
              description="Our algorithm connects you with developers whose skills complement yours perfectly for your next big project."
              delay={0.1}
            />
            <FeatureCard 
              icon={Users}
              title="Real Connections"
              description="Skip the noise. Connect directly with people who are actually writing code and building products."
              delay={0.2}
            />
            <FeatureCard 
              icon={Globe}
              title="Global Network"
              description="Find talent or mentors from anywhere in the world. Tech knows no borders on DevTinder."
              delay={0.3}
            />
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};
