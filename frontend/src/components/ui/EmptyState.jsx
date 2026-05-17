import React from 'react';
import { motion } from 'framer-motion';
import { Users, Frown } from 'lucide-react';
import { Button } from './Button';
import { Link } from 'react-router-dom';

export const EmptyState = ({ 
  icon: Icon = Users, 
  title = "No data found", 
  message = "We couldn't find anything here.", 
  actionText, 
  actionLink 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-8 sm:p-12 text-center h-full min-h-[400px]"
    >
      <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-glow-purple">
        <Icon size={40} className="text-brand-purple" />
      </div>
      <h3 className="text-2xl font-bold text-slate-100 mb-2">{title}</h3>
      <p className="text-slate-400 max-w-md mb-8">{message}</p>
      
      {actionText && actionLink && (
        <Link to={actionLink}>
          <Button variant="gradient">{actionText}</Button>
        </Link>
      )}
    </motion.div>
  );
};
