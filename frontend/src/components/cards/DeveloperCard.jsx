import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Code, Briefcase, Globe, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const DeveloperCard = ({ developer, onSwipe }) => {
  if (!developer) return null;

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(e, { offset, velocity }) => {
        const swipe = offset.x;
        if (swipe > 100) {
          onSwipe('right');
        } else if (swipe < -100) {
          onSwipe('left');
        }
      }}
      className="glass-card w-full max-w-sm mx-auto h-[600px] flex flex-col relative overflow-hidden group cursor-grab active:cursor-grabbing"
    >
      {/* Profile Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={developer.photoUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"} 
          alt={developer.firstName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white pb-24">
        <div className="flex justify-between items-end mb-2">
          <h2 className="text-3xl font-bold tracking-tight">
            {developer.firstName} {developer.lastName}
          </h2>
          {developer.experienceLevel && (
            <Badge color="gradient" className="mb-1">{developer.experienceLevel}</Badge>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-slate-300 text-sm mb-4">
          {developer.location && (
            <span className="flex items-center gap-1">
              <MapPin size={14} /> {developer.location}
            </span>
          )}
          {developer.role && (
            <span className="flex items-center gap-1">
              <Briefcase size={14} /> {developer.role}
            </span>
          )}
        </div>

        {/* Skills Preview */}
        <div className="flex flex-wrap gap-2 mb-4">
          {developer.skills?.slice(0, 4).map((skill) => (
            <Badge key={skill} color="slate" className="bg-slate-900/80 backdrop-blur-sm border-slate-700/50">
              {skill}
            </Badge>
          ))}
          {developer.skills?.length > 4 && (
            <Badge color="slate" className="bg-slate-900/80 backdrop-blur-sm">
              +{developer.skills.length - 4}
            </Badge>
          )}
        </div>

        {/* Bio Snippet */}
        <p className="text-slate-300 text-sm line-clamp-3 mb-4">
          {developer.bio || "Hi there! I'm a developer looking to connect with others and build amazing projects."}
        </p>

        {/* Social Links (prevent drag on these) */}
        <div className="flex gap-3 mt-auto" onPointerDown={(e) => e.stopPropagation()}>
          {developer.githubUrl && (
            <a href={developer.githubUrl} target="_blank" rel="noreferrer" className="p-2 bg-slate-900/80 backdrop-blur-md rounded-full text-slate-300 hover:text-white hover:bg-brand-purple transition-all">
              <Globe size={18} />
            </a>
          )}
          {developer.linkedinUrl && (
            <a href={developer.linkedinUrl} target="_blank" rel="noreferrer" className="p-2 bg-slate-900/80 backdrop-blur-md rounded-full text-slate-300 hover:text-white hover:bg-brand-blue transition-all">
              <LinkIcon size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
