import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from './Button';

export const ErrorState = ({ message = "Something went wrong.", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[300px] border border-rose-500/20 bg-rose-500/5 rounded-2xl">
      <AlertCircle size={48} className="text-rose-500 mb-4" />
      <h3 className="text-xl font-bold text-slate-100 mb-2">Oops! Error</h3>
      <p className="text-slate-400 mb-6">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>Try Again</Button>
      )}
    </div>
  );
};
