import { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { MessageBubble } from './MessageBubble';
import { Button } from '../ui/Button';
import { getDisplayName, getPhotoUrl } from '../../utils/userDisplay';
import { getMessageSenderId } from './MessageBubble';

export function ChatWindow(props) {
  const { partner, messages, currentUserId, onSend, onRefresh, sending, loading, canSend = true } = props;
  const [text, setText] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || sending || !canSend) return;
    setText('');
    await onSend(trimmed);
  }

  if (!partner) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-center">
        <div>
          <p className="text-xl font-semibold text-slate-200 mb-2">Select a conversation</p>
          <p className="text-slate-500 text-sm">Choose a connection from the sidebar to start messaging.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-950/50">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-800 bg-slate-900/80">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar src={getPhotoUrl(partner)} alt={getDisplayName(partner)} size="md" />
          <div className="min-w-0">
            <p className="font-semibold text-white truncate">{getDisplayName(partner)}</p>
            <p className="text-xs text-slate-500">Connected</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          title="Refresh messages"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading && messages.length === 0 ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <p className="text-center text-slate-500 text-sm py-12">
            No messages yet. Say hello to {partner.firstName}!
          </p>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg._id}
              message={msg}
              isOwn={getMessageSenderId(msg) === String(currentUserId)}
            />
          ))
        )}
        <div ref={bottomRef} />
      </div>
      {!canSend && (
        <p className="px-4 py-2 text-xs text-amber-400 bg-amber-500/10 border-t border-amber-500/20 text-center">
          Accept this connection under Requests before you can send messages.
        </p>
      )}
      <form onSubmit={handleSubmit} className="p-4 border-t border-slate-800 bg-slate-900/80">
        <div className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={canSend ? 'Type a message...' : 'Connect first to chat'}
            disabled={!canSend}
            className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent disabled:opacity-50"
          />
          <Button type="submit" variant="gradient" disabled={!canSend || sending || !text.trim()} isLoading={sending}>
            <Send size={18} />
          </Button>
        </div>
        <p className="text-[10px] text-slate-600 mt-2 text-center">Messages refresh automatically every few seconds</p>
      </form>
    </div>
  );
}
