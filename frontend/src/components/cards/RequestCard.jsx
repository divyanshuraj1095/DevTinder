import { Check, X } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { getAbout, getDisplayName, getPhotoUrl } from '../../utils/userDisplay';

export const RequestCard = ({ request, onAccept, onReject }) => {
  const raw = request.fromUserId;
  const user = raw && typeof raw === 'object' && raw.firstName ? raw : { firstName: 'Developer', lastName: '', about: '', skills: [] };
  if (!raw) return null;

  return (
    <RequestCardInner request={request} user={user} onAccept={onAccept} onReject={onReject} />
  );
};

function RequestCardInner({ request, user, onAccept, onReject }) {
  return (
    <div className="glass-card p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
      <Avatar src={getPhotoUrl(user)} alt={getDisplayName(user)} size="xl" className="border-2 border-brand-purple/50 shrink-0" />
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-xl text-slate-100 mb-1">{getDisplayName(user)}</h3>
        <p className="text-sm text-slate-400 mb-3 line-clamp-2">{getAbout(user) || "Hi! I'd like to connect."}</p>
        <div className="flex flex-wrap gap-1">
          {user.skills?.slice(0, 4).map((skill) => (
            <span key={skill} className="text-[10px] font-medium px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
        <Button variant="gradient" className="flex-1 sm:w-32" onClick={() => onAccept(request._id)}>
          <Check size={18} /> Accept
        </Button>
        <Button variant="secondary" className="flex-1 sm:w-32 hover:bg-rose-500/10 hover:text-rose-400" onClick={() => onReject(request._id)}>
          <X size={18} /> Reject
        </Button>
      </div>
    </div>
  );
}
