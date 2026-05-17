import React from 'react';
import { MessageSquare, ExternalLink } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Link } from 'react-router-dom';

export const ConnectionCard = ({ user }) => {
  return (
    <div className="glass-card p-5 flex flex-col hover-glow transition-all duration-300">
      <div className="flex items-start gap-4 mb-4">
        <Avatar src={user.photoUrl} alt={user.firstName} size="lg" />
        <div className="flex-1 min-w-0">
          <Link to={`/profile/${user._id}`} className="block font-bold text-lg text-slate-100 truncate hover:text-brand-purple transition-colors">
            {user.firstName} {user.lastName}
          </Link>
          <p className="text-sm text-slate-400 truncate">{user.role || 'Developer'}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {user.skills?.slice(0, 3).map(skill => (
              <Badge key={skill} color="slate" className="text-[10px] py-0.5 px-2">{skill}</Badge>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-auto pt-4 flex gap-2 border-t border-slate-700/50">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-800 hover:bg-brand-purple text-slate-300 hover:text-white rounded-lg transition-colors text-sm font-medium">
          <MessageSquare size={16} /> Chat
        </button>
        <Link to={`/profile/${user._id}`} className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors text-sm font-medium">
          <ExternalLink size={16} /> Profile
        </Link>
      </div>
    </div>
  );
};
