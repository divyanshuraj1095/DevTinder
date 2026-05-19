import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { ChatSidebar } from '../components/chat/ChatSidebar';
import { ChatWindow } from '../components/chat/ChatWindow';
import { getConnections } from '../services/connection.service';
import { getMessages, sendMessage } from '../services/chat.service';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const POLL_MS = 4000;

export const Chat = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [connections, setConnections] = useState([]);
  const [connectionsLoading, setConnectionsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const partnerFromList = connections.find((c) => String(c._id) === String(userId));

  const partner = useMemo(() => {
    if (partnerFromList) return partnerFromList;
    if (!userId) return null;
    return { _id: userId, firstName: 'Connection', lastName: '' };
  }, [partnerFromList, userId]);

  const loadConnections = useCallback(async () => {
    setConnectionsLoading(true);
    try {
      const data = await getConnections();
      const list = Array.isArray(data) ? data : [];
      setConnections(list);
      if (!userId && list.length > 0) {
        navigate(`/chat/${list[0]._id}`, { replace: true });
      }
    } catch {
      toast.error('Failed to load connections');
    } finally {
      setConnectionsLoading(false);
    }
  }, [userId, navigate]);

  const loadMessages = useCallback(async (silent = false) => {
    if (!userId) {
      setMessages([]);
      return;
    }
    if (!silent) setMessagesLoading(true);
    try {
      const data = await getMessages(userId);
      setMessages(data);
    } catch (err) {
      if (!silent) toast.error(err.parsedMessage || 'Failed to load messages');
    } finally {
      if (!silent) setMessagesLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadConnections();
  }, [loadConnections]);

  useEffect(() => {
    setMessages([]);
    loadMessages();
    if (!userId) return undefined;
    const interval = setInterval(() => loadMessages(true), POLL_MS);
    return () => clearInterval(interval);
  }, [userId, loadMessages]);

  const handleSend = async (text) => {
    if (!userId || !user) return;
    setSending(true);

    const optimistic = {
      _id: `temp-${Date.now()}`,
      fromUser: user._id,
      toUser: userId,
      text,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);

    try {
      await sendMessage(userId, text);
      await loadMessages(true);
    } catch (err) {
      setMessages((prev) => prev.filter((m) => m._id !== optimistic._id));
      toast.error(err.parsedMessage || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  return (
    <PageWrapper className="py-0">
      <div className="max-w-6xl mx-auto h-[calc(100vh-4rem)] flex flex-col md:flex-row border-x border-slate-800">
        <ChatSidebar
          connections={connections}
          activeUserId={userId}
          loading={connectionsLoading}
        />
        {userId && !partnerFromList && !connectionsLoading && (
          <p className="md:hidden text-xs text-amber-400 px-4 py-2 bg-amber-500/10 border-b border-amber-500/20">
            Open chat only with accepted connections. Accept them under Requests first.
          </p>
        )}
        <ChatWindow
          partner={partner}
          messages={messages}
          currentUserId={user?._id}
          onSend={handleSend}
          onRefresh={() => loadMessages()}
          sending={sending}
          loading={messagesLoading}
          canSend={Boolean(partnerFromList)}
        />
      </div>
    </PageWrapper>
  );
};
