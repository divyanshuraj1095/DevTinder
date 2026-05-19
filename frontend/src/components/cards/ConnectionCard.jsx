import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { getDisplayName, getPhotoUrl } from '../../utils/userDisplay';

export const ConnectionCard = ({ user }) => {
  return (
    <div className="glass-card p-5 flex flex-col hover-glow transition-all duration-300">
      <div className="flex items-start gap-4 mb-4">
        <Avatar src={getPhotoUrl(user)} alt={getDisplayName(user)} size="lg" />
        <div className="flex-1 min-w-0">
          <p className="font-bold text-lg text-slate-100 truncate">{getDisplayName(user)}</p>
          {user.age && <p className="text-sm text-slate-500">{user.age} years old</p>}
          <SkillTags user={user} />
        </div>
      </div>
      <div className="mt-auto pt-4 border-t border-slate-700/50">
        <Link
          to={`/chat/${user._id}`}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-brand text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <MessageSquare size={16} /> Open chat
        </Link>
      </div>
    </div>
  );
};

function SkillTags({ user }) {
  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {user.skills?.slice(0, 3).map((skill) => (
        <Badge key={skill} color="slate" className="text-[10px] py-0.5 px-2">
          {skill}
        </Badge>
      ))}
    </div>
  );
}
