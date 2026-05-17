import React from 'react';
import { motion } from 'framer-motion';

export const PageWrapper = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={`min-h-[calc(100vh-64px)] pt-16 ${className}`}
    >
      {children}
    </motion.div>
  );
};
