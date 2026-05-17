import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SkeletonLoader } from '../components/ui/SkeletonLoader';
import { Globe, Link as LinkIcon, MapPin, Briefcase, Calendar, MessageSquare, UserPlus } from 'lucide-react';
import { getProfile } from '../services/user.service';
import { useAuth } from '../hooks/useAuth';

export const DeveloperProfile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (user && (id === user._id || id === 'me')) {
          setProfile(user);
        } else {
          // If trying to view someone else, the backend doesn't support fetching a single user by ID right now
          throw new Error("Viewing other profiles not supported by backend yet");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, user]);

  if (loading) return <PageWrapper><div className="pt-12"><SkeletonLoader type="profile" /></div></PageWrapper>;
  if (!profile) return <PageWrapper><div className="text-center pt-24 text-slate-400">Profile not found</div></PageWrapper>;

  return (
    <PageWrapper>
      {/* Profile Banner */}
      <div className="h-64 md:h-80 w-full bg-gradient-hero relative">
        <div className="absolute inset-0 bg-slate-900/40"></div>
        {/* Abstract shapes in background */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-brand-purple/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-brand-blue/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-32 relative z-10 pb-20">
        <div className="glass-panel rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row gap-8 items-start">
          
          {/* Avatar and Quick Actions */}
          <div className="flex flex-col items-center gap-6 w-full md:w-auto">
            <Avatar src={profile.photoUrl} alt={profile.firstName} size="2xl" className="border-4 border-slate-900 shadow-2xl" />
            <div className="flex gap-3 w-full md:w-auto">
              <Button variant="gradient" className="flex-1 md:flex-none">
                <UserPlus size={18} /> Connect
              </Button>
              <Button variant="secondary" className="flex-1 md:flex-none">
                <MessageSquare size={18} /> Message
              </Button>
            </div>
            
            <div className="flex gap-4 w-full justify-center pb-6 border-b border-slate-800 md:border-none">
              {profile.githubUrl && (
                <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  <Globe size={24} />
                </a>
              )}
              {profile.linkedinUrl && (
                <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-brand-blue transition-colors">
                  <LinkIcon size={24} />
                </a>
              )}
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl font-bold text-white tracking-tight flex items-center gap-3">
                  {profile.firstName} {profile.lastName}
                  {profile.experienceLevel && (
                    <Badge color="gradient" className="text-sm font-medium px-3 py-1 mt-1">{profile.experienceLevel}</Badge>
                  )}
                </h1>
                <p className="text-xl text-slate-300 mt-2">{profile.role || 'Full Stack Developer'}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-slate-400 text-sm mb-8">
              <span className="flex items-center gap-1.5"><MapPin size={16} /> San Francisco, CA</span>
              <span className="flex items-center gap-1.5"><Briefcase size={16} /> Open to work</span>
              <span className="flex items-center gap-1.5"><Calendar size={16} /> Joined March 2024</span>
            </div>

            <div className="space-y-10">
              <section>
                <h3 className="text-xl font-semibold text-white mb-3">About Me</h3>
                <p className="text-slate-300 leading-relaxed bg-slate-800/30 p-5 rounded-2xl border border-slate-700/50">
                  {profile.bio || "Passionate developer looking to build great things with great people."}
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">Skills & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills?.map(skill => (
                    <Badge key={skill} color="slate" className="px-4 py-2 text-sm bg-slate-800/80">{skill}</Badge>
                  ))}
                </div>
              </section>

              {/* GitHub Stats UI Placeholder */}
              <section>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <Globe size={20} /> GitHub Activity
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Repositories', value: '42' },
                    { label: 'Commits (YTD)', value: '1,284' },
                    { label: 'Stars', value: '156' },
                    { label: 'Followers', value: '89' },
                  ].map(stat => (
                    <div key={stat.label} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 text-center">
                      <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                      <p className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
