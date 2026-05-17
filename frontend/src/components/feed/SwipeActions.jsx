import React from 'react';
import { motion } from 'framer-motion';
import { X, Heart, Star } from 'lucide-react';

export const SwipeActions = ({ onSwipeLeft, onSwipeRight, onSuperLike }) => {
  return (
    <div className="flex items-center justify-center gap-6 mt-8">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onSwipeLeft}
        className="w-16 h-16 rounded-full bg-slate-800 border-2 border-rose-500/50 flex items-center justify-center text-rose-500 shadow-lg hover:shadow-rose-500/20 hover:bg-rose-500/10 transition-colors"
      >
        <X size={32} />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onSuperLike}
        className="w-12 h-12 rounded-full bg-slate-800 border-2 border-amber-500/50 flex items-center justify-center text-amber-500 shadow-lg hover:shadow-amber-500/20 hover:bg-amber-500/10 transition-colors"
      >
        <Star size={24} />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onSwipeRight}
        className="w-16 h-16 rounded-full bg-slate-800 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-500 shadow-lg hover:shadow-emerald-500/20 hover:bg-emerald-500/10 transition-colors"
      >
        <Heart size={32} />
      </motion.button>
    </div>
  );
};
