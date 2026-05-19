import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';

export function IncomingRequestsBanner({ count }) {
  if (!count || count < 1) return null;

  return (
    <Link
      to="/requests"
      className="block mb-6 p-4 rounded-xl bg-gradient-to-r from-brand-purple/20 to-brand-blue/20 border border-brand-purple/40 hover:border-brand-purple transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brand-purple/30 flex items-center justify-center shrink-0">
          <Bell size={20} className="text-brand-purple" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white">
            {count} connection request{count !== 1 ? 's' : ''} waiting
          </p>
          <p className="text-sm text-slate-400">Tap to review and accept</p>
        </div>
        <span className="text-brand-purple font-medium text-sm shrink-0">View →</span>
      </div>
    </Link>
  );
}
