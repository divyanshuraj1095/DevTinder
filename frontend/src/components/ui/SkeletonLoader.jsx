import React from 'react';

export const SkeletonLoader = ({ type = 'card' }) => {
  if (type === 'profile') {
    return (
      <div className="animate-pulse bg-slate-800 rounded-2xl p-6 w-full max-w-2xl mx-auto border border-slate-700">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-32 h-32 rounded-full bg-slate-700 shrink-0"></div>
          <div className="flex-1 space-y-4 w-full">
            <div className="h-8 bg-slate-700 rounded-lg w-1/2"></div>
            <div className="h-4 bg-slate-700 rounded-lg w-1/4"></div>
            <div className="space-y-2 pt-4">
              <div className="h-4 bg-slate-700 rounded-lg w-full"></div>
              <div className="h-4 bg-slate-700 rounded-lg w-5/6"></div>
              <div className="h-4 bg-slate-700 rounded-lg w-4/6"></div>
            </div>
            <div className="flex gap-2 pt-4">
              <div className="h-8 w-16 bg-slate-700 rounded-full"></div>
              <div className="h-8 w-20 bg-slate-700 rounded-full"></div>
              <div className="h-8 w-24 bg-slate-700 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default card skeleton
  return (
    <div className="animate-pulse glass-card h-[600px] w-full max-w-md mx-auto flex flex-col relative overflow-hidden">
      <div className="w-full h-3/4 bg-slate-700"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent pt-20">
        <div className="h-8 bg-slate-600 rounded-lg w-1/2 mb-2"></div>
        <div className="h-4 bg-slate-600 rounded-lg w-1/3 mb-4"></div>
        <div className="flex gap-2 mb-4">
          <div className="h-6 w-16 bg-slate-600 rounded-full"></div>
          <div className="h-6 w-20 bg-slate-600 rounded-full"></div>
        </div>
        <div className="h-4 bg-slate-600 rounded-lg w-full mb-2"></div>
        <div className="h-4 bg-slate-600 rounded-lg w-4/5"></div>
      </div>
    </div>
  );
};
