import React, { useState, useEffect } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { RequestCard } from '../components/cards/RequestCard';
import { EmptyState } from '../components/ui/EmptyState';
import { getPendingRequests, reviewRequest } from '../services/connection.service';
import { Bell } from 'lucide-react';
import toast from 'react-hot-toast';

export const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getPendingRequests();
        setRequests(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch requests", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleReview = async (status, requestId) => {
    // Optimistic UI
    setRequests(prev => prev.filter(req => req._id !== requestId));
    
    try {
      await reviewRequest(status, requestId);
      toast.success(status === 'accepted' ? 'Connection accepted!' : 'Request ignored');
    } catch (error) {
      toast.error('Failed to process request');
      // Re-fetch or rollback on failure
    }
  };

  return (
    <PageWrapper className="py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8 border-b border-slate-800 pb-4">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Bell className="text-brand-purple" /> Notifications
          </h1>
          <p className="text-slate-400">Review your incoming connection requests</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="h-32 bg-slate-800 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map(request => (
              <RequestCard 
                key={request._id} 
                request={request} 
                onAccept={(id) => handleReview('accepted', id)}
                onReject={(id) => handleReview('rejected', id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState 
            icon={Bell}
            title="All caught up!"
            message="You don't have any pending connection requests."
          />
        )}
      </div>
    </PageWrapper>
  );
};
