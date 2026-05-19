import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { RequestCard } from '../components/cards/RequestCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { reviewRequest } from '../services/connection.service';
import { usePendingRequests } from '../hooks/usePendingRequests';
import { getSentRequests } from '../utils/sentRequestsStorage';
import { getDisplayName } from '../utils/userDisplay';
import { Bell, Send, RefreshCw, Heart, Info } from 'lucide-react';
import toast from 'react-hot-toast';

export const Requests = () => {
  const { requests, loading, refresh } = usePendingRequests(0);
  const [sentRequests, setSentRequests] = useState([]);
  const [tab, setTab] = useState('received');

  useEffect(() => {
    setSentRequests(getSentRequests());
  }, [tab]);

  const handleReview = async (status, requestId) => {
    try {
      await reviewRequest(status, requestId);
      toast.success(
        status === 'accepted'
          ? 'Connection accepted! Open Connections or Chat to message them.'
          : 'Request rejected'
      );
      await refresh();
    } catch (err) {
      toast.error(err.parsedMessage || 'Failed to process request');
    }
  };

  return (
    <PageWrapper className="py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-3">
              <Bell className="text-brand-purple" /> Connection requests
            </h1>
            <p className="text-slate-400">Accept incoming requests · Track requests you sent</p>
          </div>
          <Button type="button" variant="secondary" onClick={() => { refresh(); setSentRequests(getSentRequests()); }}>
            <RefreshCw size={16} /> Refresh
          </Button>
        </div>

        <div className="mb-6 p-4 rounded-xl bg-brand-purple/10 border border-brand-purple/30 text-sm text-slate-300">
          <strong className="text-white">How it works:</strong> Like someone on the{' '}
          <Link to="/feed" className="text-brand-purple hover:underline">Feed</Link> to send a request.
          They accept under <strong className="text-white">Received</strong> — then you both appear under{' '}
          <Link to="/connections" className="text-brand-purple hover:underline">Connections</Link>.
        </div>

        <div className="flex gap-2 mb-6 p-1 bg-slate-800/80 rounded-xl border border-slate-700">
          <TabButton id="received" label="Received" count={requests.length} active={tab} onSelect={setTab} icon={Bell} />
          <TabButton id="sent" label="Sent" count={sentRequests.length} active={tab} onSelect={setTab} icon={Send} />
        </div>

        {tab === 'received' ? (
          <ReceivedTab requests={requests} loading={loading} onAccept={(id) => handleReview('accepted', id)} onReject={(id) => handleReview('rejected', id)} />
        ) : (
          <SentTab sentRequests={sentRequests} />
        )}
      </div>
    </PageWrapper>
  );
};

function TabButton({ id, label, count, active, onSelect, icon: Icon }) {
  const isActive = active === id;
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
        isActive ? 'bg-brand-purple text-white shadow-lg' : 'text-slate-400 hover:text-white'
      }`}
    >
      <Icon size={16} />
      {label}
      {count > 0 && (
        <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20' : 'bg-slate-700'}`}>
          {count}
        </span>
      )}
    </button>
  );
}

function ReceivedTab({ requests, loading, onAccept, onReject }) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-32 bg-slate-800 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }
  if (requests.length === 0) {
    return (
      <EmptyState
        icon={Bell}
        title="No incoming requests"
        message="When another developer likes you on the feed, their request shows up here. You can Accept to connect or Reject to decline."
        actionText="Go to Feed"
        actionLink="/feed"
      />
    );
  }
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400 mb-2">
        {requests.length} developer{requests.length !== 1 ? 's want' : ' wants'} to connect with you
      </p>
      {requests.map((request) => (
        <RequestCard
          key={request._id}
          request={request}
          onAccept={onAccept}
          onReject={onReject}
        />
      ))}
    </div>
  );
}

function SentTab({ sentRequests }) {
  if (sentRequests.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="No sent requests yet"
        message="Like someone on the Feed (heart button) to send them a connection request. They will see it under Received and can accept."
        actionText="Discover developers"
        actionLink="/feed"
      />
    );
  }
  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-400 flex items-start gap-2 mb-4">
        <Info size={16} className="shrink-0 mt-0.5 text-brand-purple" />
        Waiting for them to accept. Once accepted, they appear under Connections.
      </p>
      {sentRequests.map((req) => (
        <div key={req._id} className="glass-card p-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-white">{getDisplayName(req)}</p>
            <p className="text-xs text-slate-500 mt-1">Sent {req.sentAt ? new Date(req.sentAt).toLocaleDateString() : 'recently'}</p>
          </div>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
            Pending
          </span>
        </div>
      ))}
    </div>
  );
}
