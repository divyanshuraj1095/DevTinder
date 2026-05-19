import { useState, useEffect } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { DeveloperCard } from '../components/cards/DeveloperCard';
import { SwipeActions } from '../components/feed/SwipeActions';
import { SkeletonLoader } from '../components/ui/SkeletonLoader';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorState } from '../components/ui/ErrorState';
import { getFeed } from '../services/user.service';
import { sendRequest } from '../services/connection.service';
import { addSentRequest } from '../utils/sentRequestsStorage';
import { usePendingRequests } from '../hooks/usePendingRequests';
import { IncomingRequestsBanner } from '../components/requests/IncomingRequestsBanner';
import toast from 'react-hot-toast';
import { Sparkles } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export const Feed = () => {
  const { count: pendingCount } = usePendingRequests(30000);
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchFeed = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFeed();
      setFeed(Array.isArray(data) ? data : []);
      setCurrentIndex(0);
    } catch {
      setError('Failed to load developers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const currentDev = feed[currentIndex];

  const handleAction = async (status) => {
    if (!currentDev) return;
    const dev = currentDev;
    setCurrentIndex((prev) => prev + 1);

    try {
      await sendRequest(status, dev._id);
      if (status === 'interested') {
        addSentRequest(dev);
        toast.success(`Request sent to ${dev.firstName}. They can accept under Requests.`, { icon: '👋', duration: 5000 });
      }
    } catch (err) {
      toast.error(err.parsedMessage || 'Failed to send request');
    }
  };

  return (
    <PageWrapper className="flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-md mx-auto px-4">
        <IncomingRequestsBanner count={pendingCount} />
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">Discover Developers</h1>
          <p className="text-slate-400 text-sm mt-1">Heart = send request · X = ignore</p>
        </div>

        {loading ? (
          <SkeletonLoader type="card" />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchFeed} />
        ) : !currentDev ? (
          <EmptyState
            icon={Sparkles}
            title="You have seen everyone"
            message="Check back later for more developers in your feed."
            actionText="View connections"
            actionLink="/connections"
          />
        ) : (
          <div className="relative w-full aspect-[3/4] max-h-[70vh]">
            <AnimatePresence mode="popLayout">
              <DeveloperCard key={currentDev._id} developer={currentDev} onSwipe={(dir) => handleAction(dir === 'right' ? 'interested' : 'ignored')} />
            </AnimatePresence>
          </div>
        )}

        {currentDev && !loading && !error && (
          <SwipeActions
            onIgnore={() => handleAction('ignored')}
            onLike={() => handleAction('interested')}
          />
        )}
      </div>
    </PageWrapper>
  );
};
