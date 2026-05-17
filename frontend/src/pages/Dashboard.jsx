import React, { useState, useEffect } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { DeveloperCard } from '../components/cards/DeveloperCard';
import { SwipeActions } from '../components/feed/SwipeActions';
import { SkeletonLoader } from '../components/ui/SkeletonLoader';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorState } from '../components/ui/ErrorState';
import { getFeed } from '../services/user.service';
import { sendRequest } from '../services/connection.service';
import toast from 'react-hot-toast';
import { Sparkles } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export const Dashboard = () => {
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
    } catch (err) {
      setError("Failed to load developers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const currentDev = feed[currentIndex];

  const handleSwipe = async (direction) => {
    if (!currentDev) return;
    
    // Optimistic UI update
    setCurrentIndex(prev => prev + 1);

    const status = direction === 'right' ? 'interested' : 'ignored';
    try {
      await sendRequest(status, currentDev._id);
      if (direction === 'right') {
        toast.success(`Sent request to ${currentDev.firstName}`, { icon: '👋' });
      }
    } catch (error) {
      toast.error("Failed to send request.");
      // Rollback if needed, though in Tinder apps usually we don't
    }
  };

  const handleSuperLike = async () => {
    if (!currentDev) return;
    setCurrentIndex(prev => prev + 1);
    try {
      await sendRequest('interested', currentDev._id); // Assuming super like is just interested for now
      toast.success(`Super Liked ${currentDev.firstName}!`, { icon: '⭐' });
    } catch (error) {
      toast.error("Failed to send request.");
    }
  };

  return (
    <PageWrapper className="flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-md mx-auto px-4">
        {loading ? (
          <SkeletonLoader type="card" />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchFeed} />
        ) : !currentDev ? (
          <EmptyState 
            icon={Sparkles}
            title="You've seen everyone!"
            message="Check back later for more developers, or explore our global directory."
            actionText="Explore Directory"
            actionLink="/explore"
          />
        ) : (
          <div className="relative w-full aspect-[3/4] max-h-[70vh]">
            <AnimatePresence mode="popLayout">
              <DeveloperCard 
                key={currentDev._id} 
                developer={currentDev} 
                onSwipe={handleSwipe} 
              />
            </AnimatePresence>
          </div>
        )}

        {currentDev && !loading && !error && (
          <SwipeActions 
            onSwipeLeft={() => handleSwipe('left')}
            onSwipeRight={() => handleSwipe('right')}
            onSuperLike={handleSuperLike}
          />
        )}
      </div>
    </PageWrapper>
  );
};
