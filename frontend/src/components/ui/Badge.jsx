import React from 'react';

export const Badge = ({ children, color = 'blue', className = '' }) => {
  const colors = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    slate: 'bg-slate-800 text-slate-300 border-slate-700',
    gradient: 'bg-gradient-brand text-white border-transparent'
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${colors[color]} ${className}`}>
      {children}
    </span>
  );
};
