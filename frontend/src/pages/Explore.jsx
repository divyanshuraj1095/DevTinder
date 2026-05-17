import React, { useState, useEffect } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { FilterPanel } from '../components/explore/FilterPanel';
import { ConnectionCard } from '../components/cards/ConnectionCard';
import { SearchBar } from '../components/ui/SearchBar';
import { exploreUsers } from '../services/user.service';
import { useDebounce } from '../hooks/useDebounce';

export const Explore = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [filters, setFilters] = useState({ skills: [], experience: [] });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await exploreUsers({ search: debouncedSearch, ...filters });
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to explore users", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [debouncedSearch, filters]);

  return (
    <PageWrapper className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Explore Developers</h1>
          <p className="text-slate-400">Find developers by skills, experience, or name.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-72 shrink-0">
            <div className="sticky top-24 space-y-6">
              <SearchBar 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                placeholder="Search developers..." 
              />
              <FilterPanel filters={filters} setFilters={setFilters} />
            </div>
          </div>

          {/* Results Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-48 bg-slate-800 rounded-2xl animate-pulse"></div>
                ))}
              </div>
            ) : users.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {users.map(user => (
                  <ConnectionCard key={user._id} user={user} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-800/30 rounded-2xl border border-slate-800">
                <p className="text-slate-400 text-lg">No developers found matching your criteria.</p>
                <button 
                  onClick={() => { setSearch(''); setFilters({ skills: [], experience: [] }); }}
                  className="mt-4 text-brand-purple hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
