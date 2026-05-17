import React from 'react';
import { Check, X } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

export const RequestCard = ({ request, onAccept, onReject }) => {
  const user = request.fromUserId;

  if (!user) return null;

  return (
    <div className="glass-card p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 hover:shadow-glow-purple transition-shadow">
      <Link to={`/profile/${user._id}`} className="shrink-0">
        <Avatar src={user.photoUrl} alt={user.firstName} size="xl" className="border-2 border-brand-purple/50" />
      </Link>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Link to={`/profile/${user._id}`}>
            <h3 className="font-bold text-xl text-slate-100 hover:text-brand-purple transition-colors">
              {user.firstName} {user.lastName}
            </h3>
          </Link>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-brand-purple/20 text-brand-purple border border-brand-purple/30">
            {user.experienceLevel || 'Developer'}
          </span>
        </div>
        <p className="text-sm text-slate-400 mb-3 line-clamp-2">
          {user.bio || "Hi! I'd like to connect."}
        </p>
        
        <div className="flex flex-wrap gap-1">
          {user.skills?.slice(0, 4).map(skill => (
            <span key={skill} className="text-[10px] font-medium px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex sm:flex-col gap-2 w-full sm:w-auto mt-4 sm:mt-0">
        <Button 
          variant="gradient" 
          className="flex-1 sm:w-32 py-2"
          onClick={() => onAccept(request._id)}
        >
          <Check size={18} /> Accept
        </Button>
        <Button 
          variant="secondary" 
          className="flex-1 sm:w-32 py-2 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/50"
          onClick={() => onReject(request._id)}
        >
          <X size={18} /> Ignore
        </Button>
      </div>
    </div>
  );
};
