import React from 'react';

export const Avatar = ({ src, alt, size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    '2xl': 'w-32 h-32'
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className={`relative rounded-full overflow-hidden bg-slate-800 border-2 border-slate-700 shrink-0 ${sizes[size]} ${className}`}>
      {src ? (
        <img 
          src={src} 
          alt={alt || "Avatar"} 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium bg-gradient-to-br from-slate-800 to-slate-900">
          {getInitials(alt)}
        </div>
      )}
    </div>
  );
};
