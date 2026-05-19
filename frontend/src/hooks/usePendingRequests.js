import { useState, useEffect, useCallback } from 'react';
import { getPendingRequests } from '../services/connection.service';
import { useAuth } from './useAuth';

export function usePendingRequests(pollMs = 30000) {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) {
      setRequests([]);
      return [];
    }
    setLoading(true);
    try {
      const data = await getPendingRequests();
      const list = Array.isArray(data) ? data : [];
      setRequests(list);
      return list;
    } catch {
      setRequests([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refresh();
    if (!user || !pollMs) return undefined;
    const id = setInterval(refresh, pollMs);
    return () => clearInterval(id);
  }, [user, pollMs, refresh]);

  return { requests, count: requests.length, loading, refresh };
}
