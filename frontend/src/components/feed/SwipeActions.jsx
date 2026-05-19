import { motion } from 'framer-motion';
import { X, Heart } from 'lucide-react';

export const SwipeActions = ({ onIgnore, onLike }) => {
  return (
    <ActionButtons onIgnore={onIgnore} onLike={onLike} />
  );
};

function ActionButtons({ onIgnore, onLike }) {
  return (
    <div className="flex items-center justify-center gap-10 mt-8">
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        type="button"
        onClick={onIgnore}
        className="w-16 h-16 rounded-full bg-slate-800 border-2 border-rose-500/50 flex items-center justify-center text-rose-500 shadow-lg hover:bg-rose-500/10 transition-colors"
        aria-label="Ignore"
      >
        <X size={32} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        type="button"
        onClick={onLike}
        className="w-16 h-16 rounded-full bg-slate-800 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-500 shadow-lg hover:bg-emerald-500/10 transition-colors"
        aria-label="Send request"
      >
        <Heart size={32} />
      </motion.button>
    </div>
  );
}
