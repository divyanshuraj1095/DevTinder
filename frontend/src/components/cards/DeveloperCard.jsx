import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { getAbout, getDisplayName, getPhotoUrl } from '../../utils/userDisplay';

const FALLBACK_PHOTO =
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop';

export const DeveloperCard = ({ developer, onSwipe }) => {
  if (!developer) return null;

  const photo = getPhotoUrl(developer) || FALLBACK_PHOTO;
  const about = getAbout(developer);

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, { offset }) => {
        if (offset.x > 100) onSwipe('right');
        else if (offset.x < -100) onSwipe('left');
      }}
      className="glass-card w-full max-w-sm mx-auto h-[600px] flex flex-col relative overflow-hidden group cursor-grab active:cursor-grabbing"
    >
      <div className="absolute inset-0 z-0">
        <img src={photo} alt={getDisplayName(developer)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
      </div>

      <CardContent developer={developer} about={about} />
    </motion.div>
  );
};

function CardContent({ developer, about }) {
  return (
    <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white pb-8">
      <h2 className="text-3xl font-bold tracking-tight mb-1">
        {getDisplayName(developer)}
        {developer.age ? <span className="text-2xl font-normal text-slate-300">, {developer.age}</span> : null}
      </h2>
      {developer.gender && (
        <p className="text-slate-400 text-sm capitalize mb-3 flex items-center gap-1">
          <User size={14} /> {developer.gender}
        </p>
      )}
      <div className="flex flex-wrap gap-2 mb-4">
        {developer.skills?.slice(0, 5).map((skill) => (
          <Badge key={skill} color="slate" className="bg-slate-900/80 backdrop-blur-sm border-slate-700/50">
            {skill}
          </Badge>
        ))}
        {developer.skills?.length > 5 && (
          <Badge color="slate" className="bg-slate-900/80">+{developer.skills.length - 5}</Badge>
        )}
      </div>
      <p className="text-slate-300 text-sm line-clamp-4">{about || 'No bio yet.'}</p>
    </div>
  );
}
