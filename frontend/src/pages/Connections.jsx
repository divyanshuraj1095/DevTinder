import React, { useState, useEffect } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { ConnectionCard } from '../components/cards/ConnectionCard';
import { SearchBar } from '../components/ui/SearchBar';
import { EmptyState } from '../components/ui/EmptyState';
import { getConnections } from '../services/connection.service';
import { pruneSentRequests } from '../utils/sentRequestsStorage';
import { Users } from 'lucide-react';

export const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const data = await getConnections();
        const list = Array.isArray(data) ? data : [];
        setConnections(list);
        pruneSentRequests(list.map((c) => c._id));
      } catch (error) {
        console.error("Failed to fetch connections", error);
      } finally {
        setLoading(false);
      }
    };
    fetchConnections();
  }, []);

  const filteredConnections = connections.filter(conn => 
    `${conn.firstName} ${conn.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    conn.skills?.some(skill => skill.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <PageWrapper className="py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Connections</h1>
            <p className="text-slate-400">You have {connections.length} connections</p>
          </div>
          <div className="w-full sm:w-72">
            <SearchBar 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              placeholder="Search by name or skill..." 
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-40 bg-slate-800 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : filteredConnections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConnections.map(conn => (
              <ConnectionCard key={conn._id} user={conn} />
            ))}
          </div>
        ) : (
          <EmptyState 
            icon={Users}
            title={search ? "No connections found" : "No connections yet"}
            message={search ? `No results for "${search}"` : "Start swiping to build your network!"}
            actionText={!search ? "Find Developers" : ""}
            actionLink="/feed"
          />
        )}
      </div>
    </PageWrapper>
  );
};
