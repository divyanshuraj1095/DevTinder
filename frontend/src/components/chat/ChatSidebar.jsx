import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { getDisplayName, getPhotoUrl } from '../../utils/userDisplay';

export const ChatSidebar = ({ connections, activeUserId, loading }) => {
  return (
    <aside className="w-full md:w-80 lg:w-96 border-r border-slate-800 flex flex-col bg-slate-900/50 shrink-0 h-full">
      <div className="p-4 border-b border-slate-800">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <MessageSquare size={20} className="text-brand-purple" />
          Messages
        </h2>
        <p className="text-xs text-slate-500 mt-1">Chat with your connections</p>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 bg-slate-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : connections.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-8 px-4">
            No connections yet. Match with developers from the feed to start chatting.
          </p>
        ) : (
          <ul className="space-y-1">
            {connections.map((conn) => {
              const id = conn._id;
              const isActive = activeUserId === id;
              return (
                <li key={id}>
                  <Link
                    to={`/chat/${id}`}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      isActive
                        ? 'bg-brand-purple/20 border border-brand-purple/40'
                        : 'hover:bg-slate-800/80 border border-transparent'
                    }`}
                  >
                    <Avatar src={getPhotoUrl(conn)} alt={getDisplayName(conn)} size="md" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-slate-100 truncate">{getDisplayName(conn)}</p>
                      <p className="text-xs text-slate-500 truncate">
                        {conn.skills?.slice(0, 2).join(' · ') || 'Developer'}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
};
